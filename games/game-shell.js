const API = "https://api.08home.com";
const token =
    localStorage.getItem(
        "08home_game_session"
    ) || "";

const game =
    document.body.dataset.game;

async function heartbeat() {
    if (!token) return;

    try {
        await fetch(
            `${API}/game/presence`,
            {
                method: "POST",
                headers: {
                    "Content-Type":
                        "application/json",
                    Authorization:
                        `Bearer ${token}`
                },
                body:
                    JSON.stringify({
                        game
                    })
            }
        );
    } catch {}
}

async function refreshCount() {
    try {
        const response =
            await fetch(
                `${API}/game/presence/counts`,
                {
                    cache:
                        "no-store"
                }
            );

        const data =
            await response.json();

        document.getElementById(
            "game-page-online-count"
        ).textContent =
            String(
                Number(
                    data?.counts?.[
                        game
                    ] || 0
                )
            );
    } catch {}
}

if (!token) {
    location.replace(
        "/#goals"
    );
} else {
    heartbeat();
    refreshCount();

    setInterval(
        heartbeat,
        45000
    );

    setInterval(
        refreshCount,
        30000
    );
}
