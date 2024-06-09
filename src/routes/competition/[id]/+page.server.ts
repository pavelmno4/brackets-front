export async function load({ params }) {
    return {
        id: params.id,
        title: 'Витязи Подмосковья',
        startDate: new Date(2024, 8, 25),
        endDate: new Date(2024, 8, 26),
        address: 'Московская обл., Серпуховский р-н, п. Большевик, Спортивная, 13',
        imagePath: 'https://cdn.shopify.com/static/sample-images/bath_grande_crop_center.jpeg'
    };
}