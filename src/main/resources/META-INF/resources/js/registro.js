document.getElementById('form-persona').addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));

    try {
        const res = await fetch('/personas', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data),
        });
        if (!res.ok) throw new Error('Error al registrar persona');
        alert('Persona registrada con éxito');
        e.target.reset();
    } catch (error) {
        alert(error.message);
    }
});
