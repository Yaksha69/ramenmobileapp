// Mobile Order Management JavaScript

// Sample order data for demonstration
const orderData = {
    'ORD1001': {
        items: [
            { 
                name: 'Tonkotsu Ramen', 
                description: 'Signature pork broth ramen with chashu pork',
                quantity: 1, 
                price: 250, 
                subtotal: 250,
                image: '../assets/ramen1.jpg'
            },
            { 
                name: 'Gyoza (6 pcs)', 
                description: 'Pan-fried dumplings with pork and vegetables',
                quantity: 1, 
                price: 100, 
                subtotal: 100,
                image: '../assets/side1.jpg'
            }
        ]
    },
    'ORD1002': {
        items: [
            { 
                name: 'Miso Ramen', 
                description: 'Traditional miso broth with tofu and vegetables',
                quantity: 1, 
                price: 180, 
                subtotal: 180,
                image: '../assets/ramen2.jpg'
            },
            { 
                name: 'Edamame', 
                description: 'Steamed soybeans with sea salt',
                quantity: 1, 
                price: 30, 
                subtotal: 30,
                image: '../assets/side2.jpg'
            }
        ]
    },
    'ORD1003': {
        items: [
            { 
                name: 'Spicy Ramen', 
                description: 'Spicy tonkotsu broth with extra chili oil',
                quantity: 2, 
                price: 220, 
                subtotal: 440,
                image: '../assets/ramen3.jpg'
            },
            { 
                name: 'Takoyaki (8 pcs)', 
                description: 'Octopus balls with special sauce and mayo',
                quantity: 1, 
                price: 140, 
                subtotal: 140,
                image: '../assets/side3.jpg'
            }
        ]
    },
    'ORD1004': {
        items: [
            { 
                name: 'Chicken Teriyaki Bowl', 
                description: 'Grilled chicken with teriyaki sauce over rice',
                quantity: 1, 
                price: 280, 
                subtotal: 280,
                image: '../assets/ricebowl.jpg'
            },
            { 
                name: 'Miso Soup', 
                description: 'Traditional Japanese soup with tofu and seaweed',
                quantity: 1, 
                price: 80, 
                subtotal: 80,
                image: '../assets/side4.jpg'
            },
            { 
                name: 'Green Tea', 
                description: 'Premium Japanese green tea',
                quantity: 1, 
                price: 60, 
                subtotal: 60,
                image: '../assets/coke.webp'
            }
        ]
    },
    'ORD1005': {
        items: [
            { 
                name: 'Veggie Ramen', 
                description: 'Vegetarian ramen with fresh vegetables',
                quantity: 1, 
                price: 200, 
                subtotal: 200,
                image: '../assets/ramen4.jpg'
            },
            { 
                name: 'Spring Rolls (4 pcs)', 
                description: 'Fresh vegetable spring rolls with sweet chili sauce',
                quantity: 1, 
                price: 100, 
                subtotal: 100,
                image: '../assets/side2.jpg'
            }
        ]
    }
};

// Function to view order details
function viewOrderDetails(orderId, customerName, orderDate, orderStatus, paymentStatus, phone, address, subtotal, deliveryFee, total) {
    // Update modal content with order details
    document.getElementById('modalOrderId').textContent = '#' + orderId;
    document.getElementById('modalOrderDate').textContent = orderDate;
    document.getElementById('modalCustomerName').textContent = customerName;
    document.getElementById('modalCustomerPhone').textContent = phone;
    document.getElementById('modalCustomerAddress').textContent = address;
    
    // Update status badges
    const orderStatusElement = document.getElementById('modalOrderStatus');
    const paymentStatusElement = document.getElementById('modalPaymentStatus');
    
    // Clear existing classes and set new ones based on status
    orderStatusElement.className = 'badge';
    paymentStatusElement.className = 'badge';
    
    if (orderStatus === 'Processing') {
        orderStatusElement.classList.add('bg-warning', 'text-dark');
    } else if (orderStatus === 'Delivered') {
        orderStatusElement.classList.add('bg-success');
    } else if (orderStatus === 'Pending') {
        orderStatusElement.classList.add('bg-secondary');
    }
    
    if (paymentStatus === 'Paid') {
        paymentStatusElement.classList.add('bg-success');
    } else if (paymentStatus === 'Pending') {
        paymentStatusElement.classList.add('bg-warning', 'text-dark');
    } else if (paymentStatus === 'Failed') {
        paymentStatusElement.classList.add('bg-danger');
    }
    
    orderStatusElement.textContent = orderStatus;
    paymentStatusElement.textContent = paymentStatus;
    
    // Update order items
    const orderItems = orderData[orderId] ? orderData[orderId].items : [];
    const tbody = document.getElementById('modalOrderItems');
    tbody.innerHTML = '';
    
    orderItems.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <div class="d-flex align-items-center">
                    <div class="item-image me-3">
                        <img src="${item.image}" alt="${item.name}" class="menu-item-img">
                    </div>
                    <div>
                        <div class="fw-semibold">${item.name}</div>
                        <small class="text-muted">${item.description}</small>
                    </div>
                </div>
            </td>
            <td class="text-center">
                <span class="badge bg-light text-dark">${item.quantity}</span>
            </td>
            <td class="text-end">₱${item.price.toFixed(2)}</td>
            <td class="text-end fw-semibold">₱${item.subtotal.toFixed(2)}</td>
        `;
        tbody.appendChild(row);
    });
    
    // Update summary
    document.getElementById('modalSubtotal').textContent = `₱${subtotal.toFixed(2)}`;
    document.getElementById('modalDeliveryFee').textContent = `₱${deliveryFee.toFixed(2)}`;
    document.getElementById('modalTotal').textContent = `₱${total.toFixed(2)}`;
    
    // Show the modal
    const modal = new bootstrap.Modal(document.getElementById('orderDetailsModal'));
    modal.show();
}

// Function to update order status
function updateOrderStatus() {
    const currentStatus = document.getElementById('modalOrderStatus').textContent;
    const orderId = document.getElementById('modalOrderId').textContent;
    
    // Create status update modal
    const statusModal = `
        <div class="modal fade" id="statusUpdateModal" tabindex="-1">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header bg-danger text-white">
                        <div class="d-flex align-items-center">
                            <i class="fas fa-edit me-2"></i>
                            <h5 class="modal-title mb-0">Update Order Status</h5>
                        </div>
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body p-4">
                        <div class="mb-4">
                            <div class="d-flex align-items-center mb-3">
                                <i class="fas fa-info-circle text-danger me-2"></i>
                                <h6 class="mb-0 fw-bold">Current Status</h6>
                            </div>
                            <div class="current-status-card p-3 bg-light rounded">
                                <span class="badge bg-warning text-dark">${currentStatus}</span>
                            </div>
                        </div>
                        
                        <div class="mb-4">
                            <div class="d-flex align-items-center mb-3">
                                <i class="fas fa-arrow-right text-danger me-2"></i>
                                <h6 class="mb-0 fw-bold">New Status</h6>
                            </div>
                            <select class="form-select" id="newStatusSelect">
                                <option value="pending" ${currentStatus === 'Pending' ? 'selected' : ''}>Pending</option>
                                <option value="processing" ${currentStatus === 'Processing' ? 'selected' : ''}>Processing</option>
                                <option value="ready" ${currentStatus === 'Ready' ? 'selected' : ''}>Ready for Delivery</option>
                                <option value="delivered" ${currentStatus === 'Delivered' ? 'selected' : ''}>Delivered</option>
                                <option value="cancelled" ${currentStatus === 'Cancelled' ? 'selected' : ''}>Cancelled</option>
                            </select>
                        </div>
                        
                        <div class="mb-4">
                            <div class="d-flex align-items-center mb-3">
                                <i class="fas fa-sticky-note text-danger me-2"></i>
                                <h6 class="mb-0 fw-bold">Notes (Optional)</h6>
                            </div>
                            <textarea class="form-control" id="statusNotes" rows="3" placeholder="Add any notes about the status change..." style="resize: none;"></textarea>
                        </div>
                    </div>
                    <div class="modal-footer bg-light">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                            <i class="fas fa-times me-2"></i>Cancel
                        </button>
                        <button type="button" class="btn btn-success" onclick="confirmStatusUpdate()">
                            <i class="fas fa-save me-2"></i>Update Status
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Remove existing modal if any
    const existingModal = document.getElementById('statusUpdateModal');
    if (existingModal) {
        existingModal.remove();
    }
    
    // Add modal to body
    document.body.insertAdjacentHTML('beforeend', statusModal);
    
    // Show the status update modal
    const modal = new bootstrap.Modal(document.getElementById('statusUpdateModal'));
    modal.show();
}

// Function to confirm status update
function confirmStatusUpdate() {
    const newStatus = document.getElementById('newStatusSelect').value;
    const notes = document.getElementById('statusNotes').value;
    const orderId = document.getElementById('modalOrderId').textContent;
    
    // Update the status badge in the main modal
    const statusBadge = document.getElementById('modalOrderStatus');
    const statusText = document.getElementById('newStatusSelect').options[document.getElementById('newStatusSelect').selectedIndex].text;
    
    // Clear existing classes and set new ones
    statusBadge.className = 'badge fs-6';
    
    switch(newStatus) {
        case 'pending':
            statusBadge.classList.add('bg-secondary');
            break;
        case 'processing':
            statusBadge.classList.add('bg-warning', 'text-dark');
            break;
        case 'ready':
            statusBadge.classList.add('bg-info');
            break;
        case 'delivered':
            statusBadge.classList.add('bg-success');
            break;
        case 'cancelled':
            statusBadge.classList.add('bg-danger');
            break;
    }
    
    statusBadge.textContent = statusText;
    
    // Show success notification
    showNotification(`Order ${orderId} status updated to ${statusText}!`, 'success');
    
    // Close the status update modal
    const statusModal = bootstrap.Modal.getInstance(document.getElementById('statusUpdateModal'));
    statusModal.hide();
    
    // Update the main table row if it exists
    updateTableRowStatus(orderId, statusText, newStatus);
}

// Function to update the table row status
function updateTableRowStatus(orderId, statusText, statusClass) {
    const tableRows = document.querySelectorAll('#ordersTableBody tr');
    tableRows.forEach(row => {
        const orderIdCell = row.cells[0];
        if (orderIdCell && orderIdCell.textContent === orderId) {
            const statusCell = row.cells[5]; // Status column
            if (statusCell) {
                const badge = statusCell.querySelector('.badge');
                if (badge) {
                    badge.className = 'badge';
                    switch(statusClass) {
                        case 'pending':
                            badge.classList.add('bg-secondary');
                            break;
                        case 'processing':
                            badge.classList.add('bg-warning', 'text-dark');
                            break;
                        case 'ready':
                            badge.classList.add('bg-info');
                            break;
                        case 'delivered':
                            badge.classList.add('bg-success');
                            break;
                        case 'cancelled':
                            badge.classList.add('bg-danger');
                            break;
                    }
                    badge.textContent = statusText;
                }
            }
        }
    });
}



// Notification function
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `alert alert-${type === 'success' ? 'success' : type === 'error' ? 'danger' : 'info'} alert-dismissible fade show position-fixed`;
    notification.style.cssText = `
        top: 20px;
        right: 20px;
        z-index: 9999;
        min-width: 300px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        border-radius: 8px;
    `;
    notification.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 3000);
}

// Sidebar toggle functionality
document.addEventListener('DOMContentLoaded', function() {
    // Sidebar toggle
    const sidebarToggle = document.getElementById('sidebarToggle');
    const closeSidebar = document.getElementById('closeSidebar');
    const sidebar = document.querySelector('.sidebar');
    
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', function() {
            sidebar.classList.toggle('show');
        });
    }
    
    if (closeSidebar) {
        closeSidebar.addEventListener('click', function() {
            sidebar.classList.remove('show');
        });
    }
    
    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', function(event) {
        if (window.innerWidth < 768) {
            if (!sidebar.contains(event.target) && !sidebarToggle.contains(event.target)) {
                sidebar.classList.remove('show');
            }
        }
    });
    
    // Initialize date range picker
    if (typeof $.fn.daterangepicker !== 'undefined') {
        $('#filterDate').daterangepicker({
            opens: 'left',
            locale: {
                format: 'MM/DD/YYYY'
            }
        });
    }
    
    // Filter functionality
    const filterApplyBtn = document.getElementById('filterApplyBtn');
    if (filterApplyBtn) {
        filterApplyBtn.addEventListener('click', function() {
            // This would typically filter the orders based on selected criteria
            console.log('Applying filters...');
            // You would implement the actual filtering logic here
        });
    }
    

});

// Add some basic styling for sidebar on mobile
const style = document.createElement('style');
style.textContent = `
    @media (max-width: 767.98px) {
        .sidebar {
            transform: translateX(-100%);
            transition: transform 0.3s ease-in-out;
        }
        .sidebar.show {
            transform: translateX(0);
        }
    }
`;
document.head.appendChild(style);
