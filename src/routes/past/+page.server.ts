export async function load() {
    return {
        competitions: [
            {
                id: '4',
                title: 'Прошедший турнир',
                startDate: new Date(2024, 4, 25),
                endDate: new Date(2024, 4, 25),
                address: 'Московская обл., Серпуховский р-н, п. Большевик, Спортивная, 13',
                imagePath: 'https://cdn.shopify.com/static/sample-images/bath_grande_crop_center.jpeg',
                categories: [
                    {
                        yearRange: '2011-2012',
                        weights: ['32', '34', '38', '42', '46', '50', '55', '60', '66', '66+']
                    }
                ]
            }
        ]
    };
}