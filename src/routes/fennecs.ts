import { Router, Request, Response } from 'express';
import { container } from '../config/container';
import { FennecRepository } from '../repositories/FennecRepository';

// Створюємо новий роутер Express
const router = Router();
// Отримуємо екземпляр репозиторію лисиць з контейнера інверсії залежностей
const fennecRepository = container.get(FennecRepository);

// Роутер для HTTP метода GET / - отримання всіх записів лисиць
router.get('/', (async (_req: Request, res: Response) => {
    try {
        // Отримуємо всі записи лисиць з бази даних через репозиторій
        const fennecs = await fennecRepository.findAll();
        res.json(fennecs);
    } catch (error) {
        // Обробка помилки
        const errorMessage = error instanceof Error ? error.message : 'Виникла невідома помилка';
        res.status(500).json({ message: errorMessage });
    }
}) as unknown as (req: Request, res: Response) => void);

// Роутер для HTTP метода GET /:id - отримання запису одної лисиці за ідентифікатором
router.get('/:id', (async (req: Request, res: Response) => {
    try {
        // Пошук лисиці за ідентифікатором
        const fennec = await fennecRepository.findById(req.params.id);
        if (fennec) {
            res.json(fennec);
        } else {
            // Якщо заєць не знайдений, повертаємо 404 помилку
            res.status(404).json({ message: 'Запис лисиці не знайдено' });
        }
    } catch (error) {
        // Обробка помилки
        const errorMessage = error instanceof Error ? error.message : 'Виникла невідома помилка';
        res.status(500).json({ message: errorMessage });
    }
}) as unknown as (req: Request, res: Response) => void);

// Роутер для HTTP метода POST / - створення нового запису лисиці
router.post('/', (async (req: Request, res: Response) => {
    try {
        // Створюємо новий запис лисиці з даних запиту
        const newFennec = await fennecRepository.create(req.body);
        // Повертаємо статус 201 (Created) і дані створеного лисиці
        res.status(201).json(newFennec);
    } catch (error) {
        // Обробка помилки
        const errorMessage = error instanceof Error ? error.message : 'Виникла невідома помилка';
        res.status(400).json({ message: errorMessage });
    }
}) as unknown as (req: Request, res: Response) => void);

// Роутер для HTTP метода PUT /:id - повне оновлення запису лисиці
router.put('/:id', (async (req: Request, res: Response) => {
    try {
        // Перевірка наявності всіх обов'язкових полів для PUT запиту
        const requiredFields = ['name', 'age', 'height', 'weight', 'gender'];
        const missingFields = requiredFields.filter(field => !(field in req.body));

        // Якщо є відсутні поля, повертаємо помилку 400 Bad Request
        if (missingFields.length > 0) {
            return res.status(400).json({
                message: `Відсутні обов'язкові поля: ${missingFields.join(', ')}`,
            });
        }

        // Оновлюємо лисицю з вказаним ID
        const fennec = await fennecRepository.update(req.params.id, req.body);
        if (fennec) {
            return res.json(fennec);
        } else {
            // Якщо лисиця не знайдений, повертаємо 404 помилку
            return res.status(404).json({ message: 'Запис лисиці не знайдено' });
        }
    } catch (error) {
        // Обробка помилки
        const errorMessage = error instanceof Error ? error.message : 'Виникла невідома помилка';
        return res.status(400).json({ message: errorMessage });
    }
}) as unknown as (req: Request, res: Response) => void);

// Роутер для HTTP метода PATCH /:id - часткове оновлення запису лисиці
router.patch('/:id', (async (req: Request, res: Response) => {
    try {
        // Часткове оновлення запису лисиці - передаються лише ті поля, які потрібно змінити
        const fennec = await fennecRepository.patch(req.params.id, req.body);
        if (fennec) {
            res.json(fennec);
        } else {
            // Якщо лисиця не знайдений, повертаємо 404 помилку
            res.status(404).json({ message: 'Запис лисиці не знайдено' });
        }
    } catch (error) {
        // Обробка помилки
        const errorMessage = error instanceof Error ? error.message : 'Виникла невідома помилка';
        res.status(400).json({ message: errorMessage });
    }
}) as unknown as (req: Request, res: Response) => void);

// Роутер для HTTP метода DELETE /:id - видалення запису лисиці
router.delete('/:id', (async (req: Request, res: Response) => {
    try {
        // Видаляємо дані про лисицю за ID
        const fennec = await fennecRepository.delete(req.params.id);
        if (fennec) {
            // У разі успіху повертаємо повідомлення про видалення
            res.json({ message: 'Запис про лисицю видалено' });
        } else {
            // Якщо заєць не знайдений, повертаємо 404 помилку
            res.status(404).json({ message: 'Запис про лисицю не знайдено' });
        }
    } catch (error) {
        // Обробка помилки
        const errorMessage = error instanceof Error ? error.message : 'Виникла невідома помилка';
        res.status(500).json({ message: errorMessage });
    }
}) as unknown as (req: Request, res: Response) => void);

export default router;
