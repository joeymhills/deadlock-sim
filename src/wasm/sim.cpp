#include <queue>
#include <functional>
#include <string>
#include <iostream>
#include <vector>

class Hero {
public:
    std::string name;
    double health;
    double bulletDamage;
    double healthRegen;
    double bulletsPerSec;

    Hero(std::string name, double health, double bulletDamage, double healthRegen, double bulletsPerSec)
        : name(name), health(health), bulletDamage(bulletDamage), healthRegen(healthRegen), bulletsPerSec(bulletsPerSec) {}

    void takeDamage(double damage) {
        health -= damage;
        if (health < 0) health = 0;
        std::cout << name << " now has " << health << " health." << std::endl;
    }
};

class Event {
public:
    int tick;
    int tickRate;
    Hero& owner;
    Hero& target;

    Event(int tick, int tickRate, Hero& owner, Hero& target)
        : tick(tick), tickRate(tickRate), owner(owner), target(target) {}

    virtual void apply() = 0;  // Pure virtual function
};

class Sim {
public:
    Hero& heroA;
    Hero& heroB;
    int tick;
    std::priority_queue<Event*, std::vector<Event*>, std::function<bool(Event*, Event*)>> eventQueue;

    Sim(Hero& heroA, Hero& heroB) : heroA(heroA), heroB(heroB), tick(0),
        eventQueue([](Event* a, Event* b) { return a->tick > b->tick; }) {}

    void nextTick() {
        tick++;
        while (!eventQueue.empty() && eventQueue.top()->tick == tick) {
            Event* event = eventQueue.top();
            eventQueue.pop();
            event->apply();
            delete event;
        }
    }

    void scheduleEvent(Event* event) {
        eventQueue.push(event);
    }

    void run() {
        while (heroA.health > 0 && heroB.health > 0) {
            nextTick();
        }
        std::cout << "Simulation ended at tick " << tick << std::endl;
    }
};
