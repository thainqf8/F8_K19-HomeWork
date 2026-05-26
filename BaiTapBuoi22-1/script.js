const invoiceData = {
    meta: {
        invoiceNo: "WM-2026-052101",
        saleDate: "2026/05/21",
        currency: "đ",
        paymentMethod: "Cash"
    },
    seller: {
        name: "WinMark 2 Hai Bà Trưng",
        address: "2 Bà Trưng - Hoàn Kiếm - HN",
        phone: "012345678",
        representative: "Đại diện WinMark"
    },
    customer: {
        name: "Nguyễn Văn A",
        age: 20,
        address: "Hà Đông, Hà Nội"
    },
    items: [{
        no: 1,
        name: "Ao Thun",
        size: "XL",
        quantity: 1,
        price: 200000
    }, {
        no: 2,
        name: "Ao Thun",
        size: "XL",
        quantity: 1,
        price: 200000
    }],
    promotion: {
        title: "KHUYẾN MÃI / TRỢ GIÁ",
        description: "Khuyến mãi 50% dành cho Khách hàng thân thiết",
        discountPercent: 50
    }
};
const formatCurrency = (amount) => {
    return amount.toLocaleString('vi-VN') + ' ' + invoiceData.meta.currency;
};
const calculateTotals = (items, discountPercent) => {
    const subTotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const discountAmount = subTotal * (discountPercent / 100);
    const total = subTotal - discountAmount;
    return {
        subTotal,
        discountAmount,
        total
    };
};
const renderInvoice = (data) => {
    const container = document.getElementById('invoice-container');
    const totals = calculateTotals(data.items, data.promotion.discountPercent);
    const itemsHTML = data.items.map(item => `
                <tr class="border-b border-gray-100 last:border-0">
                    <td class="py-4 text-gray-400 font-medium">${item.no}</td>
                    <td class="py-4 font-semibold text-gray-800">${item.name}</td>
                    <td class="py-4 text-gray-600 text-center">${item.size}</td>
                    <td class="py-4 text-gray-800 font-medium text-center">${item.quantity}</td>
                    <td class="py-4 text-gray-600 text-right">${formatCurrency(item.price)}</td>
                    <td class="py-4 text-gray-800 font-semibold text-right">${formatCurrency(item.price * item.quantity)}</td>
                </tr>
            `).join('');
    const invoiceHTML = `
                <div class="flex justify-between items-start mb-10">
                    <div class="flex items-start gap-4">
                        <div class="bg-gray-900 text-white p-2 rounded-lg font-bold text-xl flex items-center justify-center w-12 h-12">
                            WM
                        </div>
                        <div>
                            <h1 class="text-2xl font-bold text-gray-900">${data.seller.name}</h1>
                            <p class="text-sm text-gray-500 mt-1">Cung cấp sản phẩm thời trang cao cấp & thiết kế độc quyền.</p>
                        </div>
                    </div>
                    <div class="text-right">
                        <span class="inline-block bg-teal-50 text-teal-700 text-xs font-bold px-3 py-1 rounded-full uppercase mb-3 tracking-wider">
                            Hóa Đơn Bán Lẻ
                        </span>
                        <p class="text-sm text-gray-700 font-medium mb-1">Mã số: <span class="font-semibold">${data.meta.invoiceNo}</span></p>
                        <p class="text-sm text-gray-500">Ngày bán: ${data.meta.saleDate}</p>
                    </div>
                </div>

                <div class="grid grid-cols-2 gap-12 border-t border-b border-gray-100 py-6 mb-8">
                    <div>
                        <h2 class="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Đơn vị bán hàng (Seller)</h2>
                        <h3 class="text-lg font-bold text-gray-900 mb-2">${data.seller.name}</h3>
                        <div class="flex items-center gap-2 text-gray-600 text-sm mb-2">
                            <i class="ph ph-map-pin text-gray-400 text-lg"></i>
                            ${data.seller.address}
                        </div>
                        <div class="flex items-center gap-2 text-gray-600 text-sm">
                            <i class="ph ph-phone text-gray-400 text-lg"></i>
                            ${data.seller.phone}
                        </div>
                    </div>

                    <div>
                        <h2 class="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Khách hàng (Buyer)</h2>
                        <h3 class="text-lg font-bold text-gray-900 mb-2">${data.customer.name}</h3>
                        <p class="text-gray-600 text-sm mb-2">Tuổi: ${data.customer.age}</p>
                        <div class="flex items-center gap-2 text-gray-600 text-sm">
                            <i class="ph ph-buildings text-gray-400 text-lg"></i>
                            ${data.customer.address}
                        </div>
                    </div>
                </div>

                <table class="w-full mb-8 text-sm">
                    <thead>
                        <tr class="border-b border-gray-200">
                            <th class="text-left py-3 text-gray-400 font-bold text-xs uppercase tracking-wider w-12">STT</th>
                            <th class="text-left py-3 text-gray-400 font-bold text-xs uppercase tracking-wider">Tên sản phẩm</th>
                            <th class="text-center py-3 text-gray-400 font-bold text-xs uppercase tracking-wider w-20">Size</th>
                            <th class="text-center py-3 text-gray-400 font-bold text-xs uppercase tracking-wider w-20">SL</th>
                            <th class="text-right py-3 text-gray-400 font-bold text-xs uppercase tracking-wider w-32">Đơn giá</th>
                            <th class="text-right py-3 text-gray-400 font-bold text-xs uppercase tracking-wider w-32">Thành tiền</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${itemsHTML}
                    </tbody>
                </table>

                <div class="flex justify-between items-start border-t border-gray-100 pt-8 mt-4">
                    <div class="bg-teal-50 rounded-xl p-4 flex gap-3 w-[55%] border border-teal-100">
                        <div class="bg-teal-600 rounded-full w-6 h-6 flex items-center justify-center shrink-0 mt-0.5">
                            <i class="ph-bold ph-check text-white text-xs"></i>
                        </div>
                        <div>
                            <h4 class="text-teal-800 font-bold text-sm uppercase tracking-wider mb-1">${data.promotion.title}</h4>
                            <p class="text-teal-700 text-sm">${data.promotion.description}</p>
                        </div>
                    </div>

                    <div class="w-[40%] flex flex-col gap-3">
                        <div class="flex justify-between text-gray-600 text-base">
                            <span>Cộng tiền hàng:</span>
                            <span class="font-semibold text-gray-900">${formatCurrency(totals.subTotal)}</span>
                        </div>
                        <div class="flex justify-between text-teal-600 text-base">
                            <span>Khấu trừ giảm giá:</span>
                            <span>-${formatCurrency(totals.discountAmount)}</span>
                        </div>
                        <div class="flex justify-between items-center mt-2 pt-4 border-t border-gray-100">
                            <span class="text-gray-900 font-bold text-lg">Tổng thanh toán:</span>
                            <span class="text-teal-600 font-bold text-2xl">${formatCurrency(totals.total)}</span>
                        </div>
                    </div>
                </div>
            `;
    container.innerHTML = invoiceHTML;
};
renderInvoice(invoiceData);