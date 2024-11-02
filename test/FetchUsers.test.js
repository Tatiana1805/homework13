import { expect } from "chai";
import { fetchUsers } from "../script.js";
import sinon from "sinon";

//Создаем тесты для нашей функции
describe('fetchUsers', () => {
    //Переменная для sion
    let sinonTest;
    //выполнение перед тестом
    beforeEach(() => {
        sinonTest = sinon.createSandbox() //песочница для тестов
    })

    //выполнение после теста
    afterEach(() => {
        // Востановление песочницы (заглушек и шпионов) после теста. Чтобы не было наслоения данных
        sinonTest.restore();
      });

    //Проверка на вывод данных пользователей. it - начало самого теста
    it('Должны получить и отобразить имена пользователей', async () => {
        //создаем юзеров, которых будем тестировать
        const testUserName = [           
        {
            "id": 1,
            "name": "Leanne Graham",
            "username": "Bret",
            "email": "Sincere@april.biz",
            "address": {
            "street": "Kulas Light",
            "suite": "Apt. 556",
            "city": "Gwenborough",
            "zipcode": "92998-3874",
            },
        },
        {
            "id": 2,
            "name": "Ervin Howell",
            "username": "Antonette",
            "email": "Shanna@melissa.tv",
            "address": {
            "street": "Victor Plains",
            "suite": "Suite 879",
            "city": "Wisokyburgh",
            "zipcode": "90566-7771",
            },
        },
        {
            "id": 3,
            "name": "Clementine Bauch",
            "username": "Samantha",
            "email": "Nathan@yesenia.net",
            "address": {
            "street": "Douglas Extension",
            "suite": "Suite 847",
            "city": "McKenziehaven",
            "zipcode": "59590-4157",
            },
        },
        ]

        //заглушка для глобальной функции фетч. У нас не выполняется реальный запрос, а только его иммитация
        global.fetch = sinonTest.stub().resolves({
            //запрос успешный
            ok: true,
            //Возвращение наших тестовых данных
            json: async () => testUserName
        })

        //тк у нас выводится все в консоли, то проверяем, что console.log выводядится. spy - шпион
        const consoleLog = sinonTest.spy(console, 'log')
        //Вызов нашей ассинхрон функции, которую тестируем
        await fetchUsers()
        //Наш фетч, должен вызваться только 1 раз, поэтому проверяем чтобы он выполнился только 1 раз
              //(глобыльный фетч вызван один раз)-истина
        expect(global.fetch.calledOnce).to.be.true
        //Проверка, что URL верный
                //(глобыльный фетч называется(...))-истина
        expect(global.fetch.calledWith('https://jsonplaceholder.typicode.com/users')).to.be.true
        //Проверка, что выводятся те имена, которые мы указали в песочнице (в testUserName)
        expect(consoleLog.calledWith('Leanne Graham')).to.be.true
        expect(consoleLog.calledWith('Ervin Howell')).to.be.true
        expect(consoleLog.calledWith('Clementine Bauch')).to.be.true
    })

    //Тест на вывод ошибок
    it('При ошибке должна выводиться информация о ней', async() => {
        //заглушка для глобальной функции фетч. Только теперь проверяем что ошибки отображаются
        global.fetch = sinonTest.stub().resolves({
            //теперь запрос не успешный
            ok: false,
            //Указываем статут ошибки
            status: 404
        })

        try{
            //вызываем функцию нашу
            await fetchUsers();
            //если наша функция не выведет ошибку(что-то прописано не верно), то тест провалится и выведется этот результат(тест будет не пройден)
            expect.fail('Функция должна была отобразить ошибку')
        } catch(error){
            //ошибка сработала и должна вывести 'Ошибка 404'
            expect(error.message).to.include('Ошибка 404')
        }
          
    })

})