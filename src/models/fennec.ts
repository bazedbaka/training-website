import { Schema, model } from 'mongoose';

// Інтерфейс для об'єкта "Фенек"
interface IFennec {
    name: string; // Ім'я лисиці
    age: number; // Вік лисиці у роках
    height: number; // Висота лисиці в сантиметрах
    weight: number; // Вага лисиці в кілограмах
    gender: 'male' | 'female'; // Стать лисиці: 'male' - самець, 'female' - самка
    antiPredatorBehavior: string; //(реакції та стратегії захисту від хижаків або небезпеки, наприклад швидка втеча за 2 сек; маскування; групова оборона (до 10 ссавців))
    description?: string; // Опис лисиці (необов'язкове поле)
    dateAdded: Date; // Дата додавання запису до бази даних
}

// Схема MongoDB для моделі "Фенек"
const fennecSchema = new Schema<IFennec>({
    name: {
        type: String,
        required: true, // Поле є обов'язковим
    },
    age: {
        type: Number,
        required: true, // Поле є обов'язковим
    },
    height: {
        type: Number,
        required: true, // Поле є обов'язковим
    },
    weight: {
        type: Number,
        required: true, // Поле є обов'язковим
    },
    gender: {
        type: String,
        required: true, // Поле є обов'язковим
        enum: ['male', 'female'], // Допустимі значення: 'male' або 'female'
    },
    antiPredatorBehavior: {
        type: String,
        required: false,
    },
    description: String, // Необов'язкове текстове поле
    dateAdded: {
        type: Date,
        default: Date.now, // Значення за замовчуванням - поточна дата і час
    },
});

// Створення моделі Mongoose на основі схеми
export const Fennec = model<IFennec>('Fennec', fennecSchema);
export type { IFennec }; // Експортуємо інтерфейс для використання в інших файлах
