CREATE DATABASE adopcion_mascotas;
USE adopcion_mascotas;

CREATE TABLE Mascota (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    tipo VARCHAR(50) NOT NULL,
    edad INT NOT NULL,
    descripcion TEXT,
    estado ENUM('disponible', 'adoptado') NOT NULL
);

CREATE TABLE Persona (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    correo VARCHAR(100) NOT NULL,
    ciudad VARCHAR(100) NOT NULL
);

CREATE TABLE Solicitud (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_mascota INT NOT NULL,
    id_persona INT NOT NULL,
    fecha_solicitud DATE NOT NULL,
    estado ENUM('pendiente', 'aceptada', 'rechazada') NOT NULL,
    FOREIGN KEY (id_mascota) REFERENCES Mascota(id),
    FOREIGN KEY (id_persona) REFERENCES Persona(id)
);

INSERT INTO Mascota (nombre, tipo, edad, descripcion, estado) VALUES
('Luna', 'perro', 3, 'Perra juguetona y amigable', 'disponible'),
('Milo', 'gato', 2, 'Gato tranquilo que ama dormir', 'disponible'),
('Rocky', 'perro', 4, 'Perro guardián muy leal', 'adoptado'),
('Bella', 'perro', 1, 'Cachorra muy energética y cariñosa', 'disponible'),
('Whiskers', 'gato', 5, 'Gato adulto muy independiente', 'disponible'),
('Max', 'perro', 6, 'Perro mayor, muy tranquilo y obediente', 'disponible'),
('Nala', 'gato', 3, 'Gata sociable que se lleva bien con otros animales', 'adoptado'),
('Toby', 'perro', 2, 'Perro mestizo, ideal para familias', 'disponible');

INSERT INTO Persona (nombre, correo, ciudad) VALUES
('Carlos Méndez', 'carlos@example.com', 'San Salvador'),
('Ana López', 'ana@example.com', 'Santa Ana'),
('Luis Torres', 'luis@example.com', 'San Miguel'),
('María García', 'maria@example.com', 'Sonsonate'),
('Pedro Hernández', 'pedro@example.com', 'La Libertad'),
('Sofía Ramírez', 'sofia@example.com', 'Usulután'),
('Diego Morales', 'diego@example.com', 'Chalatenango'),
('Carmen Flores', 'carmen@example.com', 'Ahuachapán');

INSERT INTO Solicitud (id_mascota, id_persona, fecha_solicitud, estado) VALUES
(1, 1, '2025-05-15', 'pendiente'),
(2, 2, '2025-05-16', 'aceptada'),
(3, 3, '2025-05-17', 'rechazada'),
(4, 4, '2025-05-18', 'pendiente'),
(5, 5, '2025-05-19', 'aceptada'),
(6, 6, '2025-05-20', 'pendiente'),
(7, 7, '2025-05-21', 'aceptada'),
(8, 8, '2025-05-22', 'pendiente'),
(1, 3, '2025-05-23', 'rechazada'),
(4, 2, '2025-05-24', 'pendiente'),
(6, 1, '2025-05-25', 'pendiente'),
(8, 5, '2025-05-24', 'aceptada');