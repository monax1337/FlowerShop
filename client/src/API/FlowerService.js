import axios from 'axios';

export default class FlowerService {
    static async getAllFlowers(language) {
        try {
            const response = await axios.get(`http://localhost:3000/flowers?language=${language}`);
            return response.data;
        } catch (error) {
            console.error('Ошибка при получении цветов:', error);
            return [];
        }
    }

    static async addFlowerToService(newFlower, language) {
        try {
            const response = await axios.post('http://localhost:3000/flowers', { newFlower, language });
            console.log('Цветок успешно добавлен:', response.data);
        } catch (error) {
            console.error('Ошибка при добавлении цветка:', error);
        }
    }

    static async removeFlowers(flowerId, language) {
        try {
            const response = await axios.delete('http://localhost:3000/flowers', { data: { flowerId, language } });
            console.log('Цветок успешно удален:', response.data);
        } catch (error) {
            console.error('Ошибка при удалении цветка:', error);
        }
    }

    static async updateFlower(oldFlower, newFlower, language) {
        try {
            const response = await axios.put('http://localhost:3000/flowers', { oldFlower, newFlower, language });
            console.log('Цветок успешно обновлен:', response.data);
        } catch (error) {
            console.error('Ошибка при обновлении цветка:', error);
        }
    }
}
