// Експорт специфікації Swagger/OpenAPI для документації про API
export const swaggerSpec = {
    // Версія специфікації OpenAPI
    openapi: '3.0.0',
    // Загальна інформація про API
    info: {
        title: 'API Сайту про Лисицю Фенек',
        version: '1.0.0',
        description: 'Документація API для Сайту про Лисицю Фенек',
    },
    // Налаштування серверів для тестування API
    servers: [
        {
            url:
                process.env.CODESPACE_NAME !== undefined
                    ? `https://${process.env.CODESPACE_NAME}-5000.app.github.dev`
                    : 'http://localhost:5000',
            description: 'Development server',
        },
    ],
    // Визначення роутерів API та операцій з ними
    paths: {
        '/api/fennecs': {
            // GET запит для отримання всіх лисиць Фенек
            get: {
                summary: 'Отримати всіх Фенеків',
                responses: {
                    '200': {
                        description: 'Список всіх Фенеків',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'array',
                                    items: { $ref: '#/components/schemas/Fennec' },
                                },
                            },
                        },
                    },
                },
            },

            // POST запит для створення нового зайця
            post: {
                summary: 'Створити нову лисицю',
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: { $ref: '#/components/schemas/Fennec' },
                        },
                    },
                },
                responses: {
                    '201': {
                        description: "Створений об'єкт лисиці",
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/Fennec' },
                            },
                        },
                    },
                },
            },
        },

        // Операції для конкретного зайця за ID
        '/api/fennecs/{id}': {
            // GET запит для отримання зайця за ID
            get: {
                summary: 'Отримати лисицю за ID',
                parameters: [
                    {
                        in: 'path',
                        name: 'id',
                        required: true,
                        schema: { type: 'string' },
                        description: 'ID лисиці',
                    },
                ],
                responses: {
                    '200': {
                        description: "Об'єкт лисиці",
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/Fennec' },
                            },
                        },
                    },
                    '404': { description: 'Лисицю не знайдено' },
                },
            },

            // PUT запит для повного оновлення зайця за ID
            put: {
                summary: 'Повністю оновити Лисицю',
                parameters: [
                    {
                        in: 'path',
                        name: 'id',
                        required: true,
                        schema: { type: 'string' },
                        description: 'ID лисиці',
                    },
                ],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: { $ref: '#/components/schemas/Fennec' },
                        },
                    },
                },
                responses: {
                    '200': {
                        description: "Оновлений об'єкт лисиці",
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/Fennec' },
                            },
                        },
                    },
                    '404': { description: 'Лисицю не знайдено' },
                },
            },
            // PATCH запит для часткового оновлення зайця за ID
            patch: {
                summary: 'Частково оновити лисицю',
                parameters: [
                    {
                        in: 'path',
                        name: 'id',
                        required: true,
                        schema: { type: 'string' },
                        description: 'ID лисиці',
                    },
                ],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: { $ref: '#/components/schemas/Fennec' },
                        },
                    },
                },
                responses: {
                    '200': {
                        description: "Оновлений об'єкт лисиці",
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/Fennec' },
                            },
                        },
                    },
                    '404': { description: 'Лисицю не знайдено' },
                },
            },
            // DELETE запит для видалення даних про зайця за ID
            delete: {
                summary: 'Видалити дані про лисицю',
                parameters: [
                    {
                        in: 'path',
                        name: 'id',
                        required: true,
                        schema: { type: 'string' },
                        description: 'ID лисиці',
                    },
                ],
                responses: {
                    '200': { description: 'Повідомлення про успішне видалення' },
                    '404': { description: 'Лисицю не знайдено' },
                },
            },
        },
    },

    // Визначення компонентів для повторного використання
    components: {
        // Схеми даних
        schemas: {
            // Схема об'єкта Заєць
            Fennec: {
                type: 'object',
                required: ['name', 'age', 'height', 'weight', 'gender'],
                properties: {
                    name: {
                        type: 'string',
                        description: "Ім'я лисиці",
                    },
                    age: {
                        type: 'number',
                        description: 'Вік лисиці у роках',
                    },
                    height: {
                        type: 'number',
                        description: 'Висота лисиці в сантиметрах',
                    },
                    weight: {
                        type: 'number',
                        description: 'Вага лисиці в кілограмах',
                    },
                    gender: {
                        type: 'string',
                        enum: ['male', 'female'],
                        description: 'Стать лисиці',
                    },
                    antiPredatorBehavior: {
                        type: 'string',
                        description: 'Реакції та стратегії захисту від хижаків або небезпеки',
                    },
                    description: {
                        type: 'string',
                        description: "Опис лисиці (необов'язкове поле)",
                    },
                },
            },
        },
    },
};
