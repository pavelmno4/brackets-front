export async function load({ params }) {
    return params.gender === 'FEMALE' ?
        {
            participants: [
                {
                    'id': '1',
                    'fullName': 'Максимова Евгения',
                    'birthYear': 2011,
                    'weight': 42.4,
                    'team': 'Лесные защитники'
                },
                {
                    'id': '2',
                    'fullName': 'Ульянцева Арина',
                    'birthYear': 2015,
                    'weight': 34.4,
                    'team': 'Аaaaaaaaaaaaaaaaaaaaaaaaaaaaaaдреналин Team'
                },
                {
                    'id': '3',
                    'fullName': 'Спиридонова Наталья',
                    'birthYear': 2010,
                    'weight': 39.5,
                    'team': 'Ромашки'
                }
            ]
        } :
        {
            participants: [
                {
                    'id': '1',
                    'fullName': 'Савушкин Максим',
                    'birthYear': 2011,
                    'weight': 54.4,
                    'team': 'Аaaaaaaaaaaaaaaaaaaaaaaaaaaaaaдреналин Team'
                },
                {
                    'id': '2',
                    'fullName': 'Прохоров Константин',
                    'birthYear': 2012,
                    'weight': 53.8,
                    'team': 'Рыжий хвост'
                },
                {
                    'id': '3',
                    'fullName': 'Прокофьев Александр',
                    'birthYear': 2011,
                    'weight': 54.1,
                    'team': 'Молот'
                }
            ]
        };
}