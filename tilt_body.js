window.addEventListener('mousemove', handleTransform);
window.addEventListener('touchmove', handleTransform);

function handleTransform(event) {
    const body = document.querySelector('body');
    const tilt = 20;

    if (event.type === 'touchmove') {
        event = event.touches[0];
    }
    const x = event.clientX / window.innerWidth;
    const y = event.clientY / window.innerHeight;

    const xRotation = (0.5 - y) * tilt;
    const yRotation = (x - 0.5) * tilt;
    
    body.style.transform = `perspective(2400px) rotateX(${xRotation}deg) rotateY(${yRotation}deg)`;
}