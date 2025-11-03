// Appointment form submission logic
document.getElementById('appointmentForm').addEventListener('submit', function(event){
    event.preventDefault();

    // Generate a unique Booking ID (format: BK + YYYYMMDDHHMMSS + random digits)
    var now = new Date();
    var ymd = now.getFullYear().toString() + 
              ("0"+(now.getMonth()+1)).slice(-2) +
              ("0"+now.getDate()).slice(-2) +
              ("0"+now.getHours()).slice(-2) +
              ("0"+now.getMinutes()).slice(-2) +
              ("0"+now.getSeconds()).slice(-2);
    var random = Math.floor(1000 + Math.random() * 9000); // 4 random digits
    var bookingID = "BK" + ymd + random;

    // Show Booking ID popup to customer
    alert("Thank you for booking! Your Booking ID is: " + bookingID);

    // Collect form data
    var name = this.name.value;
    var phone = this.phone.value;
    var date = this.date.value;
    var time = this.time.value;
    var message = this.message.value;
    var myNumber = "+919912233382"; // e.g., +919876543210

    // Build the WhatsApp message (line by line, with Booking ID)
    var text =
        "New Bike Shop Appointment:\n" +
        "Booking ID: " + bookingID + "\n" +
        "Name: " + name + "\n" +
        "Phone: " + phone + "\n" +
        "Date: " + date + "\n" +
        "Time: " + time + "\n" +
        "Message: " + message;

    var encodedText = encodeURIComponent(text);

    // Device detection for WhatsApp link
    function isMobile() {
        return /Android|iPhone|iPad|iPod|webOS|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }

    var url;
    if (isMobile()) {
        url = `whatsapp://send?phone=${myNumber}&text=${encodedText}`;
    } else {
        url = `https://web.whatsapp.com/send?phone=${myNumber}&text=${encodedText}`;
    }
    window.open(url, '_blank');

    // Show success message and reset form
    document.getElementById('appoint-success').style.display = 'block';
    setTimeout(() => {
        document.getElementById('appoint-success').style.display = 'none';
        document.getElementById('appointmentForm').reset();
    }, 2500);
});


// Review form logic
document.getElementById('reviewForm').addEventListener('submit', function(event){
    event.preventDefault();
    let container = document.getElementById('reviews-container');
    let user = this.user.value.trim();
    let content = this.review.value.trim();
    if(user && content) {
        let date = new Date();
        let html = `
        <div class="review">
            <div class="review-user">${user}</div>
            <div class="review-date">${date.toISOString().split('T')[0]}</div>
            <div class="review-content">${content}</div>
        </div>`;
        container.insertAdjacentHTML('beforeend', html);
        this.reset();
    }
});


