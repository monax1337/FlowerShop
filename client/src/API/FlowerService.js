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

    static async getAllBouquets(language) {
        try {
            const response = await axios.get(`http://localhost:3000/bouquets?language=${language}`);
            return response.data;
        } catch (error) {
            console.error('Ошибка при получении цветов:', error);
            return [];
        }
    }

    static async getAllCartFlowers(language) {
        try {
            const response = await axios.get(`http://localhost:3000/cart?language=${language}`);
            return response.data;
        } catch (error) {
            console.error('Ошибка при получении цветов:', error);
            return [];
        }
    }

    static async getAllCartBouquets(language) {
        try {
            const response = await axios.get(`http://localhost:3000/cart?language=${language}`);
            return response.data;
        } catch (error) {
            console.error('Ошибка при получении цветов:', error);
            return [];
        }
    }

    static async addFlowerToService(newFlower, language) {
        try {
            const response = await axios.post('http://localhost:3000/flowers', {newFlower, language});
            console.log('Цветок успешно добавлен:', response.data);
        } catch (error) {
            console.error('Ошибка при добавлении цветка:', error);
        }
    }

    static async addBouquetToService(newBouquet, language) {
        try {
            const response = await axios.post('http://localhost:3000/bouquets', {newBouquet, language});
            console.log('Букет успешно добавлен:', response.data);
        } catch (error) {
            console.error('Ошибка при добавлении букета:', error);
        }
    }

    static async addFlowerToCart(newFlower, language) {
        try {
            const response = await axios.post('http://localhost:3000/cart', {newFlower, language});
            console.log('Цветок успешно добавлен:', response.data);
        } catch (error) {
            console.error('Ошибка при добавлении цветка:', error);
        }
    }

    static async removeFlowers(flowerId, language) {
        try {
            const response = await axios.delete('http://localhost:3000/flowers', {data: {flowerId, language}});
            console.log('Цветок успешно удален:', response.data);
        } catch (error) {
            console.error('Ошибка при удалении цветка:', error);
        }
    }

    static async removeBouquets(bouquetId, language) {
        try {
            const response = await axios.delete('http://localhost:3000/bouquets', {data: {bouquetId, language}});
            console.log('Букет успешно удален:', response.data);
        } catch (error) {
            console.error('Ошибка при удалении букета:', error);
        }
    }

    static async removeFlowersFromCart(flowerId, language) {
        try {
            const response = await axios.delete('http://localhost:3000/cart', {data: {flowerId, language}});
            console.log('Цветок успешно удален:', response.data);
        } catch (error) {
            console.error('Ошибка при удалении цветка:', error);
        }
    }

    static async updateFlower(oldFlower, newFlower, language) {
        try {
            const response = await axios.put('http://localhost:3000/flowers', {oldFlower, newFlower, language});
            console.log('Цветок успешно обновлен:', response.data);
        } catch (error) {
            console.error('Ошибка при обновлении цветка:', error);
        }
    }

    static async updateBouquet(oldBouquet, newBouquet, language) {
        try {
            const response = await axios.put('http://localhost:3000/bouquets', {oldBouquet, newBouquet, language});
            console.log('Букет успешно обновлен:', response.data);
        } catch (error) {
            console.error('Ошибка при обновлении букета:', error);
        }
    }

    static updateCartFlowerQuantity = async (flowerIndex, newQuantity, language) => {
        try {
            if (newQuantity >= 0) {
                const response = await axios.put('http://localhost:3000/cart', {
                    flowerIndex, newQuantity, language,
                });
                console.log('Количество цветков успешно обновлено:', response.data);
            } else {
                console.error('Некорректное количество цветков.');
            }
        } catch (error) {
            console.error('Ошибка при обновлении количества цветков:', error);
        }
    };
}
