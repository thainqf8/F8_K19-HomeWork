const apiUrl = 'http://localhost:3000/customers';

let currentEditId = null;
let customerToDelete = null;

document.addEventListener('DOMContentLoaded', fetchCustomers);

function fetchCustomers() {
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => renderTable(data))
        .catch(error => console.error('Error fetching data:', error));
}

function renderTable(customers) {
    const tbody = document.querySelector('#customer-table tbody');
    tbody.innerHTML = ''; // Xóa dữ liệu cũ

    customers.forEach(customer => {
        const tr = document.createElement('tr');

        const tdId = document.createElement('td');
        tdId.textContent = customer.id;

        const tdName = document.createElement('td');
        tdName.textContent = customer.name;

        const tdEmail = document.createElement('td');
        tdEmail.textContent = customer.email;

        const tdPhone = document.createElement('td');
        tdPhone.textContent = customer.phone;

        const tdAddress = document.createElement('td');
        tdAddress.textContent = customer.address;

        const tdTax = document.createElement('td');
        tdTax.textContent = customer.taxId;

        const tdStatus = document.createElement('td');
        const spanStatus = document.createElement('span');
        spanStatus.textContent = customer.status;
        spanStatus.className = customer.status === 'Active' ? 'status-badge' : 'status-badge inactive';
        tdStatus.append(spanStatus);

        const tdAction = document.createElement('td');
        
        const btnEdit = document.createElement('button');
        btnEdit.className = 'action-btn edit';
        btnEdit.innerHTML = '<i class="fas fa-pen"></i>';
        btnEdit.onclick = () => openEditModal(customer);

        const btnDelete = document.createElement('button');
        btnDelete.className = 'action-btn delete';
        btnDelete.innerHTML = '<i class="fas fa-trash-alt"></i>';
        btnDelete.onclick = () => openDeleteModal(customer.id);

        tdAction.append(btnEdit, btnDelete);

        tr.append(tdId, tdName, tdEmail, tdPhone, tdAddress, tdTax, tdStatus, tdAction);
        
        tbody.append(tr);
    });
}

function openModal(modalId) {
    document.getElementById(modalId).classList.add('active');
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('active');
    if (modalId === 'form-modal') {
        document.getElementById('customer-form').reset();
        currentEditId = null;
    }
}

document.getElementById('btn-add-new').addEventListener('click', () => {
    document.getElementById('modal-title').textContent = 'Add New Customer';
    openModal('form-modal');
});

function openEditModal(customer) {
    document.getElementById('modal-title').textContent = 'Edit Customer';
    document.getElementById('name').value = customer.name;
    document.getElementById('email').value = customer.email;
    document.getElementById('phone').value = customer.phone;
    document.getElementById('address').value = customer.address;
    document.getElementById('taxId').value = customer.taxId;
    document.getElementById('status').value = customer.status;
    
    currentEditId = customer.id;
    openModal('form-modal');
}

document.getElementById('customer-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const customerData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        address: document.getElementById('address').value,
        taxId: document.getElementById('taxId').value,
        status: document.getElementById('status').value
    };

    if (currentEditId) {
        fetch(`${apiUrl}/${currentEditId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(customerData)
        }).then(() => {
            closeModal('form-modal');
            fetchCustomers();
        });
    } else {
        customerData.id = "CUST-" + Math.floor(Math.random() * 1000);
        
        fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(customerData)
        }).then(() => {
            closeModal('form-modal');
            fetchCustomers();
        });
    }
});

function openDeleteModal(id) {
    customerToDelete = id;
    openModal('delete-modal');
}

const searchInput = document.querySelector('.search-box input');

searchInput.addEventListener('input', (e) => {
    const keyword = e.target.value.trim();
    
    const searchUrl = keyword ? `${apiUrl}?name_like=${keyword}` : apiUrl;

    fetch(searchUrl)
        .then(response => response.json())
        .then(data => {
            renderTable(data);
        })
        .catch(error => console.error('Lỗi khi tìm kiếm theo tên:', error));
});

document.getElementById('btn-confirm-delete').addEventListener('click', () => {
    if (customerToDelete) {
        fetch(`${apiUrl}/${customerToDelete}`, {
            method: 'DELETE'
        }).then(() => {
            closeModal('delete-modal');
            fetchCustomers();
            customerToDelete = null;
        });
    }
});