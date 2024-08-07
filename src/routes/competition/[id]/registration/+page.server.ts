export async function load() {
    return {
        categories: [
            {
                yearRange: '2011-2012',
                weights: ['32', '34', '38', '42', '46', '50', '55', '60', '66', '66+']
            },
            {
                yearRange: '2013-2014',
                weights: ['32', '34', '38', '42', '46', '50', '55', '60+', '', '']
            },
            {
                yearRange: '2014-2015',
                weights: ['24', '26', '30', '32', '34', '38', '42', '46', '46+', '']
            }
        ],
        teams: [
            "Единство",
            "Южный Форпост",
            "КОМБАТ Чехов",
            "Медведь",
            "Наследие"
        ]
    };
}

export const actions = {
    default: async ({ request }) => {
        const data: FormData = await request.formData()
        console.log(data)
    }
}