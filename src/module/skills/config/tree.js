// Tree should be used to generate a 'full tree' when creating templates, which includes the tree names.
// Might also have use for a 'flat tree'.
// If the whole thing is object oriented in the auto-generated version, the hierarchy can be assembled using references.
// This way the flat version can be easily assembled, using notations such as 'combat' and 'combat.strategy'.

module.exports = {
    combat: {
        description: "Skills in murder when met with resistance",
        children: {
            strategy: {
                description: "Understanding of applied knowledge in combat",
                children: {
                    weapons: {
                    },
                    obfuscation: {
                    }
                }
            },
            practical: {
                description: "Instinctive application of combat skills",
                children: {
                    unarmed: {
                        description: "The ability to fight without holding weapons"
                    },
                    weapons: {
                        description: "The ability to fight using weapons",
                        children: {
                            mounted: {
                                description: "Weapons mounted on a vehicle or turret"
                            },
                            personnel: {
                                description: "Weapons carried by sentient beings"
                            }
                        }
                    }
                }
            }
        }
    },
    science: {
        description: "Understanding of scientific methodology and its products",
        children: {
            model: {
                biology: {
                    xeno: {
                    }, 
                    terran: {
                        animal: {
                            mammal: {
                                human: 0
                            }
                        }
                    }
                },
                physics: {
                },
                psychology: {
                }
            },
            practical: {
                medical: {
                },
                engineering: {
                    weapons: {
                    },
                    engines: {
                    },
                    defenses: {
                    },
                    scanners: {
                    },
                    environmental: {
                    },
                    personnel: {
                    },
                    encryption: {
                    }
                }
            }
        }
    },
    charisma: {
        description: "An understanding of how to communicate with other sentient beings"
    },
    lore: {
        description: "General Knowledge",
        children: {
            religion: {
            }
        }
    }
}