document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.warm-countdown').forEach(function (el) {
        const targetDate = new Date(el.dataset.target).getTime();

        // 如果时间格式不对，直接显示提示
        if (isNaN(targetDate)) {
            el.innerHTML = '<span class="cd-finished">Invalid date</span>';
            return;
        }

        // 创建内部结构
        el.innerHTML = `
            <div class="cd-item"><span class="cd-num" data-days>00</span><span class="cd-label">Days</span></div>
            <span class="cd-sep">:</span>
            <div class="cd-item"><span class="cd-num" data-hours>00</span><span class="cd-label">Hours</span></div>
            <span class="cd-sep">:</span>
            <div class="cd-item"><span class="cd-num" data-minutes>00</span><span class="cd-label">Mins</span></div>
            <span class="cd-sep">:</span>
            <div class="cd-item"><span class="cd-num" data-seconds>00</span><span class="cd-label">Secs</span></div>
        `;

        const daysEl = el.querySelector('[data-days]');
        const hoursEl = el.querySelector('[data-hours]');
        const minutesEl = el.querySelector('[data-minutes]');
        const secondsEl = el.querySelector('[data-seconds]');

        const timer = setInterval(function () {
            const now = new Date().getTime();
            const diff = targetDate - now;

            if (diff <= 0) {
                clearInterval(timer);
                el.innerHTML = '<span class="cd-finished">⏳ Time\'s up!</span>';
                return;
            }

            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);

            daysEl.textContent = String(days).padStart(2, '0');
            hoursEl.textContent = String(hours).padStart(2, '0');
            minutesEl.textContent = String(minutes).padStart(2, '0');
            secondsEl.textContent = String(seconds).padStart(2, '0');
        }, 1000);
    });
});
