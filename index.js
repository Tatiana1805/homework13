//Принимаем функцию, которую будем тестировать
import { fetchUsers } from "./script.js";

fetchUsers()
    .then(() => console.log('Данные получены'))
    .catch((error) => console.error(error));
