export type MyPick<T, K extends keyof T> = { [S in K]: T[S] }; // перечисление всех ключей К с значениями из Т

export type NOfArray<ArrayObj extends any[], N extends number> = 
    N extends keyof ArrayObj ?  // проверка на то что N валидный ключ в массиве
        ArrayObj[N] extends infer T ? // выделение типа значения по ключу N
            T
        : never
    : never
;

export type Unshift<ArrayType extends any[], Element> = [Element, ...ArrayType]; // перечисление Element и распаковка массива

export type MyExclude<T, U> = T extends U ? never : T;