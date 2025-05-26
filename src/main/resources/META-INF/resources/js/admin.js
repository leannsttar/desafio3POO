async function cargarSolicitudes() {
    try {
        const res = await fetch('/solicitudes');
        const solicitudes = await res.json();
        
        const lista = document.getElementById('lista-solicitudes');
        lista.innerHTML = ''; // Limpiar lista actual
        
        if (solicitudes.length === 0) {
            lista.innerHTML = `
                <li class="solicitud-item">
                    <div class="empty-message">No hay solicitudes pendientes</div>
                </li>`;
            return;
        }
        
        solicitudes.forEach(s => {
            const li = document.createElement('li');
            li.className = 'solicitud-item';
            li.innerHTML = `
                <div class="solicitud-info">
                    <p><strong>Mascota:</strong> ${s.mascotaNombre}</p>
                    <p><strong>Solicitante:</strong> ${s.personaNombre}</p>
                    <p><strong>Fecha:</strong> ${s.fechaSolicitud}</p>
                    <p><strong>Estado:</strong> ${s.estado}</p>
                </div>
                ${s.estado === 'pendiente' ? `
                    <div class="solicitud-acciones">
                        <button onclick="cambiarEstadoSolicitud(${s.id}, 'aceptada')" class="btn-aceptar">Aceptar</button>
                        <button onclick="cambiarEstadoSolicitud(${s.id}, 'rechazada')" class="btn-rechazar">Rechazar</button>
                    </div>
                ` : ''}
            `;
            lista.appendChild(li);
        });
    } catch (error) {
        console.error('Error al cargar solicitudes:', error);
        const lista = document.getElementById('lista-solicitudes');
        if (lista) {
            lista.innerHTML = `
                <li class="solicitud-item error">
                    Error al cargar las solicitudes: ${error.message}
                </li>`;
        }
    }
}

async function cambiarEstadoSolicitud(id, estado) {
    try {
        const res = await fetch(`/solicitudes/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ estado: estado })
        });

        if (!res.ok) {
            const errorText = await res.text();
            throw new Error(`Error ${res.status}: ${errorText}`);
        }
        
        alert(`Solicitud ${estado} exitosamente`);
        cargarSolicitudes();
    } catch (error) {
        console.error('Error:', error);
        alert(`Error al procesar la solicitud: ${error.message}`);
    }
}

async function cargarMascotasAdmin() {
    try {
        const res = await fetch('/mascotas');
        const mascotas = await res.json();
        const select = document.getElementById('select-mascota-admin');
        select.innerHTML = '<option value="">Selecciona una mascota</option>';
        mascotas.forEach(m => {
            select.innerHTML += `<option value="${m.id}">${m.nombre} (${m.tipo})</option>`;
        });
    } catch (error) {
        console.error('Error al cargar mascotas:', error);
        alert('Error al cargar las mascotas');
    }
}

// Inicializar la página
document.addEventListener('DOMContentLoaded', () => {
    cargarSolicitudes();

    // Formulario para agregar mascota
    const formMascota = document.getElementById('form-mascota');
    if (formMascota) {
        formMascota.addEventListener('submit', async (e) => {
            e.preventDefault();
            const data = Object.fromEntries(new FormData(formMascota));
            data.edad = Number(data.edad);

            try {
                const res = await fetch('/mascotas', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });
                if (!res.ok) throw new Error('Error al agregar mascota');
                alert('Mascota agregada con éxito');
                formMascota.reset();
            } catch (error) {
                alert(error.message);
            }
        });
    }
});
