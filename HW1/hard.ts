import { MyCapitalize } from "./medium.ts"

type CamelizeString<S extends string> = // дополнительный тип который рекурсивно переводит строку из snake_case в camelCase
     S extends `${infer Head}_${infer Tail}` ? // если в строке есть нижние подчеркивания делим её на 2 части
          `${Head}${CamelizeString<MyCapitalize<Tail>>}` // первая часть остается, у второй первая буква переводится в верхний регистр и рекурсивно вызывается её перевод в camelCase
          : S // возвращаем строку если ничего менять не надо

export type Camelize<ObjectType> = {
	[
          Key in keyof ObjectType as Key extends string ? // строковые ключи преобразуются в camelCase
               CamelizeString <Key>
		: Key // если ключ не строка оставляем его как есть
     ]: ObjectType[Key] extends object ? // если значение - вложенный объект, рекурсивно проделываем изменение полей
		Camelize<ObjectType[Key]>
		: ObjectType[Key]
}

export type DeepPick<T, Paths> = {
     [P in keyof Paths]: P extends keyof T ? T[P] // проходим по ключам Paths, если ключ есть в T присваиваем ему значение их Т
          : P extends object ? DeepPick<T, P> : never // иначе если это вложенный объект рекурсивно спускаемся в него
}