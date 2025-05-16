document.addEventListener('DOMContentLoaded', () => {
    const mainImage = document.getElementById('main-product-image');
    const thumbnails = document.querySelectorAll('.thumbnail');
    const colorSwatches = document.querySelectorAll('.color-swatch');
    const sizeOptions = document.querySelectorAll('.size-option');
    const selectedColorSpan = document.getElementById('selected-color');
    const selectedSizeSpan = document.getElementById('selected-size');
    const sizeChartBtn = document.querySelector('.size-chart-btn');
    const compareColorsBtn = document.querySelector('.compare-colors-btn');
    const modals = document.querySelectorAll('.modal-overlay');
    const sizeChartModal = document.getElementById('size-chart-modal');
    const compareColorsModal = document.getElementById('compare-colors-modal');
    const modalCloseBtns = document.querySelectorAll('.modal-close');
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    const compareColorItems = document.querySelectorAll('.compare-color-item');


    // Thumbnail click -> update main image
    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', () => {
            thumbnails.forEach(t => t.classList.remove('active'));
            thumbnail.classList.add('active');
            const imageSrc = thumbnail.getAttribute('data-image');
            mainImage.setAttribute('src', imageSrc);
        });
    });

    // Color swatch click
    colorSwatches.forEach(swatch => {
        swatch.addEventListener('click', () => {
            colorSwatches.forEach(s => s.classList.remove('active'));
            swatch.classList.add('active');
            const color = swatch.getAttribute('data-color');
            selectedColorSpan.textContent = color;
            localStorage.setItem('selectedColor', color);
            mainImage.setAttribute('src', `https://placehold.co/600x600?text=${color}`);
        });
    });

    // Size option click
    sizeOptions.forEach(option => {
        option.addEventListener('click', () => {
            sizeOptions.forEach(o => o.classList.remove('active'));
            option.classList.add('active');
            const size = option.getAttribute('data-size');
            selectedSizeSpan.textContent = size;
            localStorage.setItem('selectedSize', size);
        });
    });

    // Tabs
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const tabId = btn.getAttribute('data-tab');
            tabContents.forEach(content => {
                content.classList.remove('active');
                if (content.id === tabId) {
                    content.classList.add('active');
                }
            });
        });
    });

    // Modals open
    sizeChartBtn.addEventListener('click', () => {
        sizeChartModal.classList.add('active');
    });

    compareColorsBtn.addEventListener('click', () => {
        compareColorsModal.classList.add('active');
    });

    // Modal selection toggle
    compareColorItems.forEach(item => {
        item.addEventListener('click', () => {
            item.classList.toggle('selected');
        });
    });

    // Modals close via button
    modalCloseBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            modals.forEach(modal => modal.classList.remove('active'));
        });
    });

    // Modals close via overlay click
    modals.forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
    });

    // Modals close via ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            modals.forEach(modal => modal.classList.remove('active'));
        }
    });

    // Restore from localStorage
    const savedColor = localStorage.getItem('selectedColor');
    if (savedColor) {
        colorSwatches.forEach(swatch => {
            if (swatch.getAttribute('data-color') === savedColor) {
                swatch.click();
            }
        });
    }

    const savedSize = localStorage.getItem('selectedSize');
    if (savedSize) {
        sizeOptions.forEach(option => {
            if (option.getAttribute('data-size') === savedSize) {
                option.click();
            }
        });
    }

    // Micro-interaction: Add to cart
    const addToCartBtn = document.querySelector('.add-to-cart');
    addToCartBtn.addEventListener('click', () => {
        addToCartBtn.style.transform = 'scale(0.95)';
        setTimeout(() => {
            addToCartBtn.style.transform = 'scale(1)';
            alert('Item added to cart!');
        }, 100);
    });

    // Add bundle to cart
    const addBundleBtn = document.querySelector('.add-bundle');
    addBundleBtn.addEventListener('click', () => {
        alert('Bundle added to cart!');
    });

    // Add related/complementary items
    const productCardButtons = document.querySelectorAll('.product-card-button');
    productCardButtons.forEach(button => {
        button.addEventListener('click', () => {
            const productName = button.parentElement.querySelector('.product-card-title').textContent;
            alert(`${productName} added to cart!`);
        });
    });
});
