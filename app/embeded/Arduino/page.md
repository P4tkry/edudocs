---
name: Wprowadzenie do kursu
---

# Wprowadzenie do kursu

Witaj w świecie **Arduino**! 🔥  
Ten kurs jest zrobiony tak, żebyś **po kolei, bez spiny** ogarnął, jak z kawałka płytki z mikrokontrolerem zrobić żywy, reagujący na świat projekt.

Zero nudnej teorii dla teorii – **dużo praktyki, konkrety, przykłady, schematy i zadania**.

---

## 🎯 Czego się nauczysz?

Po przejściu kursu będziesz umiał m.in.:

- **ogarnąć czym w ogóle jest Arduino** i jak działa pod spodem mikrokontroler ATmega,
- **migać diodami LED** – zarówno wbudowaną, jak i zewnętrznymi na pinach GPIO,
- **korzystać z pinów wejścia/wyjścia** (GPIO) – podłączać przyciski, przekaźniki, LED-y,
- **czytać stany przycisków** (pull-up, pull-down, wewnętrzne podciągnięcia),
- **gadać z komputerem** przez port szeregowy (UART / Serial) – logi, komendy, debug,
- **używać PWM**, żeby płynnie sterować jasnością diody albo prędkością silnika,
- **czytać sygnały analogowe** z czujników (np. potencjometr) przez piny A0–A5,
- ogarnąć podstawy **I2C, SPI i innych pinów specjalnych**,
- zobaczyć, że istnieją **przerwania** i bardziej zaawansowane funkcje mikrokontrolera.

To jest fundament, na którym potem możesz zbudować **dowolne projekty**: czujniki, smart-dom, roboty, automatykę, lampki RGB, co tylko wymyślisz.

---

## 🧱 Jak zbudowany jest kurs?

Kurs jest podzielony na logiczne moduły, które składają się w całość:

1. **Wstęp do Arduino** – co to za płytka, co to mikrokontroler, jak wgrać pierwszy program (migająca dioda).
2. **Piny wejścia/wyjścia (GPIO)** – diody, przyciski, przekaźnik, sterowanie światem zewnętrznym.
3. **Komunikacja szeregowa (Serial)** – monitor szeregowy, wysyłanie logów, odbieranie komend.
4. **Inne piny specjalne** – analogRead, PWM, I2C, SPI – czyli wejścia analogowe i bardziej zaawansowane możliwości płytki.
5. **Zagłębmy się dalej w Arduino** – pamięć, ATmega, przerwania i trochę „magii” spod maski.

W każdym rozdziale masz:

- **wyjaśnienie tematu po ludzku, nie akademicko**,
- **schemat podłączenia** (z obrazkiem),
- **gotowy kod** do skopiowania, z komentarzami,
- **zadania** do samodzielnego ogarnięcia (żeby nie skończyć tylko na kopiowaniu).

---

## ⚙️ Co Ci będzie potrzebne?

Na start wystarczy:

- płytka **Arduino Uno** (lub kompatybilna),
- **kabel USB** do podłączenia z komputerem,
- kilka **diod LED**, **rezystory** (220–330Ω, 10kΩ),
- **przyciski**, **płytka stykowa** i przewody połączeniowe,
- komputer z zainstalowanym:
    - **Arduino IDE** *albo*
    - **VS Code + PlatformIO** (dla tych, co lubią bardziej „pro” środowisko).

Jeśli nie masz wszystkiego od razu – spokojnie. W wielu miejscach możesz najpierw tylko przejrzeć, a potem wrócić, jak już będziesz mieć sprzęt.

---

## 🚀 Jak z tego korzystać?

Żeby wycisnąć max z kursu:

1. **Czytaj rozdział po kolei** – nie przeskakuj od razu do „fancy” rzeczy.
2. **Wgrywaj każdy przykład na Arduino** – samo czytanie kodu nie uczy.
3. **Modyfikuj kod**:
    - zmień piny,
    - zmień czasy (`delay`),
    - dodaj swoje `if`/`else` i dodatkowe reakcje.
4. **Rób zadania na końcu rozdziałów** – to tam wchodzi prawdziwe zrozumienie.
5. Jak coś nie działa – **traktuj to jak debug, nie porażkę**. Sprawdzaj:
    - połączenia na płytce,
    - numer pinu w kodzie,
    - czy wgrałeś najnowszą wersję szkicu,
    - czy COM / port szeregowy jest dobrze wybrany.

> [!TIP]
> Najlepszy sposób nauki Arduino to **„zepsuć” kod**, a potem samemu dojść, co poszło nie tak.

---

## 💡 Dla kogo jest ten kurs?

Ten kurs jest dla Ciebie, jeśli:

- **dopiero zaczynasz** z elektroniką i programowaniem,
- umiesz trochę C/C++ *albo* **nie umiesz nic – i chcesz zacząć od zera**,
- chcesz **podpiąć czujnik, diodę, przekaźnik** i zrobić coś, co *naprawdę* reaguje na świat,
- lubisz, gdy przykłady są **konkretne, praktyczne i z komentarzem „dlaczego tak, a nie inaczej”**.

Nie musisz znać matematyki wyższej, teorii układów ani elektroniki na poziomie studiów. Wystarczy ciekawość i chęć dłubania.

---

## 🔥 No to lecimy

Jeśli masz już Arduino pod ręką – przejdź do pierwszego rozdziału!

