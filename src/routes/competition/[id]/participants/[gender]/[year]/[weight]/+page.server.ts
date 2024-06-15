export async function load({ params }) {
    return {
        participants: [
            {
                'id': 1,
                'fullName': 'Савушкин Максим',
                'birthYear': 2011,
                'weight': 54.4,
                'team': 'Аaaaaaaaaaaaaaaaaaaaaaaaaaaaaaдреналин Team'
            },
            {
                'id': 2,
                'fullName': 'Прохоров Константин',
                'birthYear': 2012,
                'weight': 53.8,
                'team': 'Рыжий хвост'
            },
            {
                'id': 3,
                'fullName': 'Прокофьев Александр',
                'birthYear': 2011,
                'weight': 54.1,
                'team': 'Молот'
            }
        ]
    };
}