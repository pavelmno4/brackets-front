export async function load() {
    return {
        competitions: [
            {
                id: '1',
                title: 'Витязи Подмосковья',
                startDate: new Date(2024, 8, 25),
                endDate: new Date(2024, 8, 26),
                address: 'Московская обл., Серпуховский р-н, п. Большевик, Спортивная, 13',
                imagePath: 'https://cdn.shopify.com/static/sample-images/bath_grande_crop_center.jpeg',
                categories: [
                    {
                        yearRange: '2011-2012',
                        weights: ['32', '34', '38', '42', '46', '50', '55', '60', '66', '66+']
                    },
                    {
                        yearRange: '2013-2014',
                        weights: ['32', '34', '38', '42', '46', '50', '55', '60+']
                    },
                    {
                        yearRange: '2014-2015',
                        weights: ['24', '26', '30', '32', '34', '38', '42', '46', '46+']
                    }
                ]
            },
            {
                id: '2',
                title: 'Честь Воина',
                startDate: new Date(2024, 10, 4),
                endDate: new Date(2024, 10, 4),
                address: 'Московская обл., Серпуховский р-н, п. Большевик, Спортивная, 13',
                imagePath: 'https://cdn.shopify.com/static/sample-images/bath_grande_crop_center.jpeg',
                categories: [
                    {
                        yearRange: '2011-2012',
                        weights: ['32', '34', '38', '42', '46', '50', '55', '60', '66', '66+']
                    },
                    {
                        yearRange: '2013-2014',
                        weights: ['32', '34', '38', '42', '46', '50', '55', '60+']
                    },
                    {
                        yearRange: '2014-2015',
                        weights: ['24', '26', '30', '32', '34', '38', '42', '46', '46+']
                    }
                ]
            },
            {
                id: '3',
                title: 'Турнир Номер Три',
                startDate: new Date(2024, 10, 30),
                endDate: new Date(2024, 11, 2),
                address: 'Московская обл., Серпуховский р-н, п. Большевик, Спортивная, 13',
                imagePath: 'https://cdn.shopify.com/static/sample-images/bath_grande_crop_center.jpeg',
                categories: [
                    {
                        yearRange: '2011-2012',
                        weights: ['32', '34', '38', '42', '46', '50', '55', '60', '66', '66+']
                    },
                    {
                        yearRange: '2013-2014',
                        weights: ['32', '34', '38', '42', '46', '50', '55', '60+']
                    },
                    {
                        yearRange: '2014-2015',
                        weights: ['24', '26', '30', '32', '34', '38', '42', '46', '46+']
                    }
                ]
            }
        ]
    };
}