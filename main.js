class Reservation {
    constructor(name, checkIn, checkOut, rooms) {
        this.name = name;
        this.checkIn = checkIn;
        this.checkOut = checkOut;
        this.rooms = rooms;
    }

    getDetails() {
        return `${this.name} - Entrada: ${this.checkIn} - Salida: ${this.checkOut} - Habitaciones: ${this.rooms}`;
    }
}

class SingleRoomReservation extends Reservation {
    constructor(name, checkIn, checkOut, rooms) {
        super(name, checkIn, checkOut, rooms);
        this.type = 'Individual';
    }
}

class DoubleRoomReservation extends Reservation {
    constructor(name, checkIn, checkOut, rooms) {
        super(name, checkIn, checkOut, rooms);
        this.type = 'Doble';
    }
}

class SuiteRoomReservation extends Reservation {
    constructor(name, checkIn, checkOut, rooms) {
        super(name, checkIn, checkOut, rooms);
        this.type = 'Suite';
    }
}

// Patron factory para crear las reservas
class ReservationFactory {
    static createReservation(type, name, checkIn, checkOut, rooms) {
        switch (type) {
            case 'single':
                return new SingleRoomReservation(name, checkIn, checkOut, rooms);
            case 'double':
                return new DoubleRoomReservation(name, checkIn, checkOut, rooms);
            case 'suite':
                return new SuiteRoomReservation(name, checkIn, checkOut, rooms);
            default:
                throw new Error('Tipo de habitación no válido');
        }
    }
}

// y singleton para gestionarlas
class ReservationManager {
    constructor() {
        if (ReservationManager.instance) {
            return ReservationManager.instance;
        }
        this.reservations = [];
        ReservationManager.instance = this;
    }

    addReservation(reservation) {
        this.reservations.push(reservation);
    }

    getReservations() {
        return this.reservations;
    }
}

// Añadir una nueva reserva
function addReservation(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const checkIn = document.getElementById('checkIn').value;
    const checkOut = document.getElementById('checkOut').value;
    const rooms = document.getElementById('rooms').value;
    const roomType = document.getElementById('roomType').value;

    const newReservation = ReservationFactory.createReservation(roomType, name, checkIn, checkOut, rooms);
    const manager = new ReservationManager();
    manager.addReservation(newReservation);
    displayReservations(manager.getReservations());
    document.getElementById('reservationForm').reset();
}

// Función para mostar la reservación
function displayReservations(reservations) {
    const reservationsList = document.getElementById('reservations');
    reservationsList.innerHTML = ''; // Limpiar la lista antes de mostrar

    reservations.forEach(reservation => {
        const li = document.createElement('li');
        li.textContent = reservation.getDetails();
        reservationsList.appendChild(li);
    });
}

document.getElementById('reservationForm').addEventListener('submit', addReservation);
