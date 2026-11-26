(() => {
    const scene = document.getElementById('command-scene');
    const stack = document.querySelector('.command-stack');
    const form = document.getElementById('composer-form');
    const input = document.getElementById('command-input');
    const runButton = document.getElementById('run-btn');
    const stopButton = document.getElementById('stop-btn');
    const examples = document.getElementById('examples');
    const runPanel = document.getElementById('run-panel');
    const status = document.getElementById('run-status');
    const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');

    let runTimers = [];
    let lastWave = -Infinity;
    let previousProfile = -1;
    let waveAnimations = [];

    const fabric = document.createElement('div');
    fabric.className = 'curtain-light';
    fabric.setAttribute('aria-hidden', 'true');

    const surface = document.createElement('canvas');
    Object.assign(surface.style, {
        position: 'absolute',
        inset: '0',
        width: '100%',
        height: '100%',
        pointerEvents: 'none'
    });
    fabric.append(surface);
    scene.prepend(fabric);

    const context = surface.getContext('2d');
    const waves = [];
    let frame = 0;
    let pixels;

    const profiles = [
        { phase: 0.4, skew: 0.12 },
        { phase: 2.2, skew: -0.16 },
        { phase: 4.1, skew: 0.19 },
        { phase: 5.6, skew: -0.10 }
    ];

    function fitInput() {
        const extraWidth = Math.min(56, Math.floor(input.value.length / 60) * 14);
        stack.style.setProperty('--composer-width', `${640 + extraWidth}px`);
        input.style.height = '0px';
        input.style.overflowY = 'hidden';
        const needed = input.scrollHeight;
        input.style.height = `${Math.max(48, Math.min(144, needed))}px`;
        input.style.overflowY = needed > 144 ? 'auto' : 'hidden';
    }

    function updateComposer() {
        const length = input.value.trim().length;
        const amount = Math.min(length / 360, 1);

        form.toggleAttribute('data-has-text', length > 0);
        form.style.setProperty('--halo-near', `${14 + amount * 30}px`);
        form.style.setProperty('--halo-far', `${45 + amount * 150}px`);
        form.style.setProperty('--halo-strength', String(.12 + amount * .16));
        form.closest('.composer-glass')?.style.setProperty(
            '--glass-light', String(.42 + amount * .58)
        );

        runButton.disabled = !length || runTimers.length > 0;
        fitInput();
    }

    function paintSurface(now) {
        frame = 0;

        const width = surface.width;
        const height = surface.height;
        const duration = 4200;

        while (waves.length && now - waves[0].start >= duration) {
            waves.shift();
        }

        if (!waves.length || reducedMotion.matches) {
            waves.length = 0;
            context.clearRect(0, 0, width, height);
            return;
        }

        const fronts = waves.map(wave => {
            const age = Math.max(0, (now - wave.start) / duration);

            return {
                x: wave.x,
                y: wave.y,
                radius: 24 + (wave.reach - 24) * age,
                softness: 7 + age * 10,
                strength: Math.min(1, age * 10) * (1 - age) ** 0.9,
                skew: wave.skew || 0.15,
                phase: Math.atan2(wave.sin, wave.cos)
            };
        });

        const data = pixels.data;

        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                let light = 0;

                for (const front of fronts) {
                    const dx = x - front.x;
                    const dy = y - front.y;
                    
                    // Get the angle from the origin to this pixel
                    const angle = Math.atan2(dy, dx);
                    
                    // Create an asymmetric, wobbly distortion based on the angle
                    const wobble = Math.sin(angle * 3 + front.phase) * front.skew 
                                 + Math.cos(angle * 5 - front.phase) * (front.skew * 0.5);
                                 
                    // Apply the wobble to the distance
                    const distance = Math.hypot(dx, dy) * (1 + wobble);
                    
                    const offset = (distance - front.radius) / front.softness;
                    if (Math.abs(offset) > 3) continue;

                    const fold = offset * Math.exp(-(offset * offset) / 2);
                    light += fold * front.strength * Math.min(1, distance / 10);
                }

                const index = (y * width + x) * 4;
                const shade = light < 0;
                // Pure glass refraction: very faint white highlight, very faint dark shadow
                data[index] = shade ? 30 : 255;     // R
                data[index + 1] = shade ? 40 : 255; // G
                data[index + 2] = shade ? 35 : 255; // B
                // Drastically lower the opacity so it's just a ghostly ripple
                data[index + 3] = Math.min(10, Math.round(Math.abs(light) * 20));
            }
        }

        context.putImageData(pixels, 0, 0);
        frame = requestAnimationFrame(paintSurface);
    }

    function emitWave() {
        const now = performance.now();
        if (reducedMotion.matches || now - lastWave < 1600) return;
        lastWave = now;

        if (context) {
            const bounds = scene.getBoundingClientRect();
            const field = form.getBoundingClientRect();
            const width = 240;
            const height = Math.max(1, Math.round(width * bounds.height / Math.max(1, bounds.width)));

            if (!pixels || surface.width !== width || surface.height !== height) {
                surface.width = width;
                surface.height = height;
                pixels = context.createImageData(width, height);
                waves.length = 0;
            }

            const choices = profiles.filter((_, index) => index !== previousProfile);
            const profile = choices[Math.floor(Math.random() * choices.length)];
            previousProfile = profiles.indexOf(profile);

            const angle = Math.random() * Math.PI * 2;
            const towardX = Math.cos(angle);
            const towardY = Math.sin(angle);

            // Start somewhere beyond the composer's edge in this direction.
            const edgeDistance = Math.min(
                field.width / 2 / Math.max(Math.abs(towardX), .001),
                field.height / 2 / Math.max(Math.abs(towardY), .001)
            );
            const drift = edgeDistance + 25 + Math.random() * 145;

            const originX = Math.max(bounds.left + 16, Math.min(
                bounds.right - 16, field.left + field.width / 2 + towardX * drift
            ));
            const originY = Math.max(bounds.top + 16, Math.min(
                bounds.bottom - 16, field.top + field.height / 2 + towardY * drift
            ));
            const x = ((originX - bounds.left) / Math.max(1, bounds.width)) * width;
            const y = ((originY - bounds.top) / Math.max(1, bounds.height)) * height;
            const reach = Math.hypot(Math.max(x, width - x), Math.max(y, height - y));

            waves.push({
                x, y,
                reach: reach * 1.24,
                start: now,
                skew: profile.skew,
                cos: Math.cos(profile.phase),
                sin: Math.sin(profile.phase)
            });

            if (waves.length > 3) waves.shift();
            if (!frame) frame = requestAnimationFrame(paintSurface);
        }

        const current = getComputedStyle(form).getPropertyValue('--rim-response').trim() || '0';
        waveAnimations.forEach(animation => animation.cancel());
        waveAnimations = [
            form.animate([
                { '--rim-response': current },
                { '--rim-response': '-0.18', offset: .12 },
                { '--rim-response': '0.8', offset: .42 },
                { '--rim-response': '0' }
            ], { duration: 1200, easing: 'ease-in-out' })
        ];
    }

    input.addEventListener('input', () => {
        updateComposer();
        emitWave();
    });
    
    input.addEventListener('keydown', event => {
        if (event.key === 'Enter' && !event.shiftKey && !event.isComposing) {
            event.preventDefault();
            if (!runButton.disabled) form.requestSubmit();
        }
    });

    document.querySelectorAll('[data-example]').forEach(button => {
        button.addEventListener('click', () => {
            input.value = button.dataset.example;
            updateComposer();
            input.focus();
            input.setSelectionRange(input.value.length, input.value.length);
        });
    });

    function finishRun(message) {
        runTimers.forEach(timer => clearTimeout(timer));
        runTimers = [];
        status.textContent = message;
        stopButton.hidden = true;
        updateComposer();
    }

    form.addEventListener('submit', event => {
        event.preventDefault();
        if (runButton.disabled) return;

        examples.hidden = true;
        runPanel.hidden = false;
        stopButton.hidden = false;
        status.textContent = 'Checking the sample request…';
        runTimers = [
            setTimeout(() => {
                status.textContent = 'Found a matching sample file. Preparing the preview result…';
            }, 850),
            setTimeout(() => {
                finishRun('Preview complete. No files on your PC were changed.');
            }, 1900)
        ];
        updateComposer();
    });

    stopButton.addEventListener('click', () => {
        finishRun('Preview stopped.');
    });

    const dock = document.querySelector('.dock');
    const tabs = [...dock.querySelectorAll('.dock-tab')];

    function placeBubble(tab) {
        const bounds = tab.getBoundingClientRect();
        const dockBounds = dock.getBoundingClientRect();
        dock.style.setProperty('--dock-x', `${bounds.left - dockBounds.left - dock.clientLeft}px`);
        dock.style.setProperty('--dock-width', `${bounds.width}px`);
        dock.style.setProperty('--dock-color', getComputedStyle(tab).getPropertyValue('--tab-color').trim());
    }

    let selected = tabs[0];
    let tabMotion;

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            if (selected === tab) return;
            tabMotion?.cancel();
            selected.setAttribute('aria-pressed', 'false');
            selected = tab;
            selected.setAttribute('aria-pressed', 'true');
            placeBubble(tab);
            if (reducedMotion.matches) return;

            const hand = tab.querySelector('.clock-hand');
            const lid = tab.querySelector('.toolbox-lid');

            // Slower, smoother spring animation
            const timing = { duration: 450, easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)' };

            if (hand) {
                hand.style.transformOrigin = '12px 12px';
                tabMotion = hand.animate(
                    [{ transform: 'rotate(-65deg)' }, { transform: 'rotate(0deg)' }],
                    timing
                );
            } else if (lid) {
                tabMotion = lid.animate(
                    [{ transform: 'translateY(0)' }, { transform: 'translateY(-3px)', offset: .4 }, { transform: 'translateY(0)' }],
                    timing
                );
            }
        });
    });

    placeBubble(selected);
    requestAnimationFrame(() => dock.classList.add('is-ready'));
    new ResizeObserver(() => placeBubble(selected)).observe(dock);
    window.addEventListener('resize', fitInput);
    updateComposer();
})();
(() => {
    const button = document.getElementById('choose-background');
    const picker = document.getElementById('background-file');
    const wrapper = document.getElementById('bg-crop-wrapper');
    const toggleBtn = document.getElementById('bg-toggle-btn');
    const panel = document.getElementById('bg-panel');

    const sliderY = document.getElementById('bg-position-y');
    const sliderX = document.getElementById('bg-position-x');

    if (!button || !picker || !wrapper || !toggleBtn || !panel) return;

    const size = 32;
    const canvas = document.createElement('canvas');
    canvas.width = canvas.height = size;
    const context = canvas.getContext('2d', { willReadFrequently: true });

    let wallpaper;
    let selection = 0;

    function updateWallpaperTone() {
        if (!wallpaper) return;

        let tone = 'dark';
        if (context) {
            // We must calculate the scale the exact same way CSS does with background-size: cover
            const scale = Math.max(
                window.innerWidth / wallpaper.naturalWidth,
                window.innerHeight / wallpaper.naturalHeight
            );

            // Add a tiny bit of artificial overflow for the crop detection
            const overflow = 1.05;
            const width = (window.innerWidth / scale) / overflow;
            const height = (window.innerHeight / scale) / overflow;

            const maxX = Math.max(0, wallpaper.naturalWidth - width);
            const maxY = Math.max(0, wallpaper.naturalHeight - height);

            const x = Math.max(0, maxX * (sliderX.value / 100));
            const y = Math.max(0, maxY * (sliderY.value / 100));

            context.fillStyle = '#edf2ef';
            context.fillRect(0, 0, size, size);
            context.drawImage(wallpaper, x, y, width, height, 0, 0, size, size);

            const pixels = context.getImageData(0, 0, size, size).data;
            let brightness = 0;
            for (let i = 0; i < pixels.length; i += 4) {
                brightness += 0.2126 * pixels[i]
                    + 0.7152 * pixels[i + 1]
                    + 0.0722 * pixels[i + 2];
            }
            tone = brightness / (size * size) >= 145 ? 'light' : 'dark';
        }

        document.body.dataset.wallpaperTone = tone;
    }

    function updateBackgroundPosition() {
        // Apply position based on slider values
        document.body.style.backgroundPosition = `${sliderX.value}% ${sliderY.value}%`;
        updateWallpaperTone();
    }

    button.addEventListener('click', () => picker.click());

    picker.addEventListener('change', async () => {
        const file = picker.files[0];
        if (!file) return;
        picker.value = '';

        const currentSelection = ++selection;
        const url = URL.createObjectURL(file);
        const image = new Image();
        image.src = url;

        try {
            await image.decode();
        } catch {
            URL.revokeObjectURL(url);
            return;
        }

        if (currentSelection !== selection) {
            URL.revokeObjectURL(url);
            return;
        }

        const previousWallpaper = wallpaper;
        wallpaper = image;
        document.body.style.backgroundImage = `url("${url}")`;

        // Force the background to be slightly larger than the screen (105%)
        // This guarantees BOTH the X and Y sliders have room to move.
        document.body.style.backgroundSize = `cover`;
        document.body.style.backgroundPosition = `50% 50%`;

        // Reset sliders
        sliderX.value = 50;
        sliderY.value = 50;

        wrapper.hidden = false;
        updateBackgroundPosition();

        if (previousWallpaper) URL.revokeObjectURL(previousWallpaper.src);
    });

    // Toggle panel visibility
    toggleBtn.addEventListener('click', () => {
        panel.hidden = !panel.hidden;
    });

    // Close panel if clicking outside
    document.addEventListener('click', (e) => {
        if (!wrapper.contains(e.target) && !panel.hidden) {
            panel.hidden = true;
        }
    });

    // Listen for slider inputs
    sliderX.addEventListener('input', updateBackgroundPosition);
    sliderY.addEventListener('input', updateBackgroundPosition);

    window.addEventListener('resize', updateWallpaperTone);
})();