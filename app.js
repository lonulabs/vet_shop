/**
 * AngularJS + Angular Material core application for Biofarmex Bodega
 */
var app = angular.module('BioApp', ['ngMaterial', 'ngAnimate', 'ngAria']);

// Configuration for material theming to align with the medical, professional green-teal color theme
app.config(function($mdThemingProvider) {
  $mdThemingProvider.theme('default')
    .primaryPalette('teal', {
      'default': '700',
      'hue-1': '100',
      'hue-2': '800',
      'hue-3': '900'
    })
    .accentPalette('amber', {
      'default': '600'
    })
    .backgroundPalette('grey', {
      'default': '50'
    });
});

app.controller('StoreController', function($scope, $mdSidenav, $mdDialog, $mdToast, $interval) {
  // Initialize states
  $scope.activeTab = 'inicio';
  $scope.cart_items = [];
  $scope.searchQuery = '';
  $scope.selectedTagFilter = 'Todos';

  // Load database arrays populated from data.js
  $scope.catalogItems = window.CATALOG_ITEMS_DATA || [];
  $scope.promoItems = window.PROMO_ITEMS_DATA || [];
  $scope.carouselImages = window.CAROUSEL_GALLERY_DATA || [];
  $scope.currentSlideIdx = 0;

  // Active tags computed from elements in catalog
  $scope.tagsList = ['Todos', 'Antibióticos', 'Antiparasitarios', 'Vitaminas', 'Suplementos', 'Desparasitantes', 'Antiinflamatorios', 'Respiratorio'];

  // Recover shopping cart from localStorage on module boot
  $scope.initCart = function() {
    try {
      var stored = localStorage.getItem('biofarmex_cart');
      if (stored) {
        $scope.cart_items = JSON.parse(stored);
      }
    } catch (e) {
      console.error("No se pudo iniciar el almacenamiento persistente", e);
    }
  };

  // Persistent save support
  $scope.saveCart = function() {
    try {
      localStorage.setItem('biofarmex_cart', JSON.stringify($scope.cart_items));
    } catch(e) {
      console.error("No se pudo escribir en el almacenamiento persistente", e);
    }
  };

  // Auto scroll utility for tab navigation
  $scope.switchTab = function(tabName) {
    $scope.activeTab = tabName;
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    
    // Auto-close cart if navigating to contact or about pages
    if ($mdSidenav('rightSidenav').isOpen()) {
      $mdSidenav('rightSidenav').close();
    }
  };

  // Carousel slider cycle auto rotation
  var carouselTimer = $interval(function() {
    if ($scope.activeTab === 'inicio') {
      $scope.nextSlide();
    }
  }, 5000);

  $scope.nextSlide = function() {
    $scope.currentSlideIdx = ($scope.currentSlideIdx + 1) % $scope.carouselImages.length;
  };

  $scope.prevSlide = function() {
    $scope.currentSlideIdx = ($scope.currentSlideIdx - 1 + $scope.carouselImages.length) % $scope.carouselImages.length;
  };

  $scope.setSlide = function(idx) {
    $scope.currentSlideIdx = idx;
  };

  // Tag filter utility
  $scope.selectTag = function(tag) {
    $scope.selectedTagFilter = tag;
  };

  // Multi-criteria Catalog filter logic
  $scope.filterCatalog = function(item) {
    // 1. Tag selection query check
    if ($scope.selectedTagFilter !== 'Todos') {
      if (!item.tags || item.tags.indexOf($scope.selectedTagFilter) === -1) {
        return false;
      }
    }
    // 2. Search box string verification (fuzzy match name or tag or descriptions)
    if ($scope.searchQuery) {
      var q = $scope.searchQuery.toLowerCase();
      var matchName = item.name.toLowerCase().indexOf(q) !== -1;
      var matchInfo = item.info && item.info.toLowerCase().indexOf(q) !== -1;
      return matchName || matchInfo;
    }
    return true;
  };

  // Right-aligned side drawer (Cart sidebar) controls
  $scope.toggleCartSidenav = function() {
    $mdSidenav('rightSidenav').toggle();
  };

  $scope.closeCartSidenav = function() {
    $mdSidenav('rightSidenav').close();
  };

  // Cart calculation helpers
  $scope.getCartCount = function() {
    return $scope.cart_items.reduce(function(acc, line) {
      return acc + line.quantity;
    }, 0);
  };

  $scope.getCartSum = function() {
    return $scope.cart_items.reduce(function(acc, line) {
      return acc + (line.price * line.quantity);
    }, 0);
  };

  // Catalog item click to open detailed Formula popup Dialog
  $scope.showProductDetails = function(ev, item) {
    $scope.dialogItem = item;
    $mdDialog.show({
      contentElement: '#productDetailsDialog',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose: true
    });
  };

  $scope.closeDialog = function() {
    $mdDialog.hide();
  };

  // Add standard presenting format to purchase collection list
  $scope.addFormatToCart = function(item, format) {
    var presentation = format[1];
    var price = format[2] !== null ? parseFloat(format[2]) : 0;
    var lineId = item.name + '|' + presentation;

    var existingIdx = -1;
    for (var i = 0; i < $scope.cart_items.length; i++) {
      if ($scope.cart_items[i].id === lineId) {
        existingIdx = i;
        break;
      }
    }

    if (existingIdx !== -1) {
      $scope.cart_items[existingIdx].quantity += 1;
    } else {
      $scope.cart_items.push({
        id: lineId,
        name: item.name,
        format: presentation,
        price: price,
        quantity: 1,
        isPromo: false
      });
    }

    $scope.saveCart();
    $scope.showToast("Agregado al carrito: " + item.name + " (" + presentation + ")");
  };

  // Add discount coupon promotion to cart elements
  $scope.addPromoToCart = function(promo) {
    var lineId = promo.name + '|' + promo.unit + '|promo';
    var price = promo.price;

    var existingIdx = -1;
    for (var i = 0; i < $scope.cart_items.length; i++) {
      if ($scope.cart_items[i].id === lineId) {
        existingIdx = i;
        break;
      }
    }

    if (existingIdx !== -1) {
      $scope.cart_items[existingIdx].quantity += 1;
    } else {
      $scope.cart_items.push({
        id: lineId,
        name: promo.name,
        format: promo.unit,
        price: price,
        quantity: 1,
        isPromo: true,
        code: promo.code
      });
    }

    $scope.saveCart();
    $scope.showToast("Promoción agregada: " + promo.name);
  };

  // Increment/Decrement items inside the cart
  $scope.updateQty = function(lineId, delta) {
    for (var i = 0; i < $scope.cart_items.length; i++) {
      if ($scope.cart_items[i].id === lineId) {
        $scope.cart_items[i].quantity += delta;
        if ($scope.cart_items[i].quantity <= 0) {
          $scope.cart_items.splice(i, 1);
        }
        break;
      }
    }
    $scope.saveCart();
  };

  // Remove completely
  $scope.removeFromCart = function(lineId) {
    for (var i = 0; i < $scope.cart_items.length; i++) {
      if ($scope.cart_items[i].id === lineId) {
        var removedItem = $scope.cart_items[i].name;
        $scope.cart_items.splice(i, 1);
        $scope.showToast("Removido del carrito: " + removedItem);
        break;
      }
    }
    $scope.saveCart();
  };

  // Empty Cart fully
  $scope.clearCart = function() {
    $scope.cart_items = [];
    $scope.saveCart();
    $scope.showToast("El carrito ha sido vaciado");
  };

  $scope.isFormatInCart = function(item, formatLabel) {
    var lineId = item.name + '|' + formatLabel;
    return $scope.cart_items.some(function(line) {
      return line.id === lineId;
    });
  };

  $scope.isPromoInCart = function(promo) {
    var lineId = promo.name + '|' + promo.unit + '|promo';
    return $scope.cart_items.some(function(line) {
      return line.id === lineId;
    });
  };

  // Interactive visual prompt toast
  $scope.showToast = function(msg) {
    $mdToast.show(
      $mdToast.simple()
        .textContent(msg)
        .position('bottom right')
        .hideDelay(3000)
    );
  };

  // Copy to clipboard helper
  $scope.copyToClipboard = function(text, label) {
    var el = document.createElement('textarea');
    el.value = text;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    $scope.showToast("Copiado al portapapeles: " + label);
  };

  // Inquiry form submit handling
  $scope.contact = { name: '', email: '', phone: '', msg: '' };
  $scope.submitContactForm = function() {
    if (!$scope.contact.name || !$scope.contact.msg) {
      $scope.showToast("Por favor complete los campos obligatorios");
      return;
    }
    // Success Dialog feedback alert
    $mdDialog.show(
      $mdDialog.alert()
        .parent(angular.element(document.body))
        .clickOutsideToClose(true)
        .title('Mensaje Enviado')
        .textContent('Muchas gracias por contactarnos, Sr/Sra. ' + $scope.contact.name + '. Su mensaje para cotización / consulta ha sido recibido. Le responderemos a la brevedad.')
        .ok('Entendido')
    );
    // Overwrite fields
    $scope.contact = { name: '', email: '', phone: '', msg: '' };
  };

  // Export Cart details to clear formatted spreadsheet-friendly CSV text content for download files
  $scope.downloadCotizacion = function() {
    if ($scope.cart_items.length === 0) {
      $scope.showToast("El carrito está vacío");
      return;
    }

    var csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Producto,Presentación,Precio Unitario,Cantidad,Subtotal,Tipo\n";

    $scope.cart_items.forEach(function(line) {
      var subtotal = line.price * line.quantity;
      var type = line.isPromo ? "Promo" : "Catálogo";
      csvContent += "\"" + line.name + "\",\"" + line.format + "\"," + line.price + "," + line.quantity + "," + subtotal + ",\"" + type + "\"\n";
    });

    csvContent += "\nTotal General,,," + $scope.getCartSum();

    var encodedUri = encodeURI(csvContent);
    var link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "cotizacion_biofarmex.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    $scope.showToast("Cotización descargada con éxito");
  };

  // Submit purchase shopping cart elements summary formatted via WhatsApp API redirects
  $scope.sendWhatsApp = function() {
    if ($scope.cart_items.length === 0) {
      $scope.showToast("Agrega productos al carrito para cotizar");
      return;
    }

    var message = "*COTIZACIÓN DE PRODUCTOS - BIOFARMEX BODEGA*\n";
    message += "========================================\n\n";

    $scope.cart_items.forEach(function(line, idx) {
      var subtotal = line.price * line.quantity;
      message += (idx+1) + ". *" + line.name + "* - (" + line.format + ")\n";
      message += "   Cantidad: " + line.quantity + " x $" + line.price.toFixed(2) + " = *$" + subtotal.toFixed(2) + "*\n\n";
    });

    message += "========================================\n";
    message += "*TOTAL ESTIMADO DE COMPRA:* $" + $scope.getCartSum().toFixed(2) + " MXN\n";
    message += "Solicitante interesado en finalizar pedido. ¡Espero su confirmación de stock!";

    var whatsappUrl = "https://api.whatsapp.com/send?phone=521234567890&text=" + encodeURIComponent(message);
    window.open(whatsappUrl, '_blank');
    $scope.showToast("Redirigiendo a WhatsApp...");
  };

  // Initialize load operation
  $scope.initCart();
});
