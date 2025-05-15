import { injectable } from 'inversify';
import { Fennec, IFennec } from '../models/fennec';

// Клас-репозиторій для роботи з лисицями
// Анотація injectable дозволяє впровадити цей репозиторій через IoC контейнер
@injectable()
export class FennecRepository {
    // Метод для отримання всіх лисиць бази даних
    public async findAll(): Promise<IFennec[]> {
        return Fennec.find();
    }

    // Метод для пошуку лисиці за унікальним ідентифікатором
    public async findById(id: string): Promise<IFennec | null> {
        return Fennec.findById(id);
    }

    // Метод для створення нової лисиці в базі даних
    public async create(fennecData: IFennec): Promise<IFennec> {
        const fennec = new Fennec(fennecData);
        return fennec.save();
    }

    // Метод для видалення лисиці за ідентифікатором
    public async delete(id: string): Promise<boolean> {
        const result = await Fennec.findByIdAndDelete(id);
        return result !== null;
    }

    // Метод для повного оновлення даних про лисицю (заміна всіх полів)
    public async update(id: string, fennecData: IFennec): Promise<IFennec | null> {
        return Fennec.findByIdAndUpdate(id, fennecData, { new: true });
    }

    // Метод для часткового оновлення даних про лисицю (оновлення лише вказаних полів)
    public async patch(id: string, fennecData: Partial<IFennec>): Promise<IFennec | null> {
        return Fennec.findByIdAndUpdate(id, { $set: fennecData }, { new: true });
    }
}
