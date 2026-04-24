(function () {
  /* ── Notification pool ── */
  const notifications = [
    /* scrollando TikTok */
    { user: "marco_r",    amount: "€47",  action: "scrollando TikTok per 2 ore" },
    { user: "luca_m",     amount: "€28",  action: "scrollando TikTok per 1 ora" },
    { user: "chiara.r",   amount: "€89",  action: "scrollando TikTok per 3 ore" },
    { user: "elena.m",    amount: "€120", action: "scrollando TikTok per 4 ore" },
    { user: "valentina",  amount: "€38",  action: "scrollando TikTok per 30 minuti" },
    { user: "irene.b",    amount: "€22",  action: "scrollando TikTok per 45 minuti" },
    { user: "fabio_r",    amount: "€61",  action: "scrollando TikTok per 2 ore" },
    { user: "noemi.v",    amount: "€44",  action: "scrollando TikTok per 1 ora" },

    /* giocando a Subway Surfers */
    { user: "giulia.v",   amount: "€76",  action: "giocando a Subway Surfers per 2 ore" },
    { user: "davide_f",   amount: "€34",  action: "giocando a Subway Surfers per 1 ora" },
    { user: "carlo.t",    amount: "€58",  action: "giocando a Subway Surfers per 3 ore" },
    { user: "sara_p",     amount: "€91",  action: "giocando a Subway Surfers per 4 ore" },

    /* giocando a Block Blast */
    { user: "sofia.k",    amount: "€103", action: "giocando a Block Blast per 3 ore" },
    { user: "andrea_b",   amount: "€51",  action: "giocando a Block Blast per 2 ore" },
    { user: "simone_d",   amount: "€95",  action: "giocando a Block Blast per 4 ore" },
    { user: "matteo_c",   amount: "€63",  action: "giocando a Block Blast per 2 ore" },

    /* completando livelli – Block Blast */
    { user: "alessia.f",  amount: "€29",  action: "completando il livello 14 di Block Blast" },
    { user: "riccardo_g", amount: "€42",  action: "completando il livello 22 di Block Blast" },
    { user: "paola.m",    amount: "€37",  action: "completando il livello 8 di Block Blast" },

    /* completando livelli – Subway Surfers */
    { user: "thomas_l",   amount: "€55",  action: "completando la missione 6 di Subway Surfers" },
    { user: "lisa.c",     amount: "€48",  action: "completando la missione 11 di Subway Surfers" },
  ];

  /* ── Shuffle so every page load feels fresh ── */
  for (let i = notifications.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [notifications[i], notifications[j]] = [notifications[j], notifications[i]];
  }

  /* ── Create fixed container (once) ── */
  let container = document.getElementById('notif-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'notif-container';
    document.body.appendChild(container);
  }

  /* ── Keep max 3 toasts visible at a time ── */
  const MAX_VISIBLE = 3;
  let index = 0;

  function showNext() {
    /* Remove oldest toast if already at max */
    const existing = container.querySelectorAll('.notif-toast');
    if (existing.length >= MAX_VISIBLE) {
      const oldest = existing[existing.length - 1];
      oldest.classList.remove('notif-in');
      oldest.classList.add('notif-out');
      setTimeout(() => oldest.remove(), 420);
    }

    const n = notifications[index % notifications.length];
    index++;

    /* Build toast element */
    const toast = document.createElement('div');
    toast.className = 'notif-toast';
    toast.innerHTML =
      '<div class="notif-icon">$</div>' +
      '<div class="notif-body">' +
        '<div class="notif-main">' +
          '<span class="notif-user">' + n.user + '</span>' +
          ' ha guadagnato ' +
          '<span class="notif-amount">' + n.amount + '</span>' +
        '</div>' +
        '<div class="notif-sub">' + n.action + '</div>' +
      '</div>' +
      '<div class="notif-dot"></div>';

    /* Prepend so newest is always on top */
    container.prepend(toast);

    /* Trigger entrance animation on next frame */
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        toast.classList.add('notif-in');
      });
    });

    /* Auto-dismiss after 4 s */
    setTimeout(function () {
      toast.classList.remove('notif-in');
      toast.classList.add('notif-out');
      setTimeout(function () { toast.remove(); }, 420);
    }, 4000);

    /* Next notification in 2.6 s */
    setTimeout(showNext, 2600);
  }

  /* First one after 1.2 s */
  setTimeout(showNext, 1200);
})();
