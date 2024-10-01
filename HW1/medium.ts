
export type DeepPartial<T> = {
    [P in keyof T] ?: T[P] extends object ? 
    DeepPartial<T[P]>  
    : T[P] | undefined  // тот же тип Partial только с рекурсивным спуском
};

export type MyCapitalize<T extends string> = 
    0 extends keyof T ? // проверяем что в строке есть хотябы 1 буква
        T extends `${T[0]}${infer Tail}` ? // если есть еще буквы капитализируем только первую
            `${Uppercase<T[0]>}${Tail}` 
            : `${Uppercase<T>}` // иначе всю строку из одной буквы
        : T

export type DeepMutable<T> = { -readonly [P in keyof T] ?: T[P] extends object ? DeepMutable<T[P]> : T[P]}; 
// убираем модификатор у всех полей, после чего езначения объекты рекурсивно вызываем DeepMutable для значений

export type ParseURLParams<StringElem extends string> = 
    StringElem extends `${infer Head}/:${infer Param}/:${infer Tail}`
		? // Если строка содержит несколько параметров, получаем первый параметр и рекурсивно применяем ParseURLParams
		  Param | ParseURLParams<`${Param}/:${Tail}`>
		: StringElem extends `${infer Head}/:${infer Param}`? // Если строка содержит один параметр, извлекаем его
            Param
		    : null
;