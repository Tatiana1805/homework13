//Функция для вывода имен + отлов ошибок
export async function fetchUsers(){
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!response.ok) {
            throw new Error(`Ошибка ${response.status}`)
        }
        const userName = await response.json();
        userName.forEach(el => {
            console.log(el.name)
        });
        return userName
    } catch(error) {
        console.error('Ошибка при загрузке данных', error);
        throw error;
    }
}
