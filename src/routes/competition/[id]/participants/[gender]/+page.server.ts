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
        } : { participants: [] };
}