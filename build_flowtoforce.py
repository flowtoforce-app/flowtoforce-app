#!/usr/bin/env python3
"""
Build complete FlowToForce HTML with all chapters and séances
"""

import json

# Chapter data structure with all 8 chapters
chapters_data = {
    "ch0": {
        "title": "Chapitre 0",
        "subtitle": "FlowToForce - Qu'est-ce que c'est?",
        "seances": []  # Chapter 0 has no séances
    },
    "ch1": {
        "title": "Chapitre 1",
        "subtitle": "Apprivoiser le muscle sans crainte",
        "seances": [
            {
                "id": "seance1a",
                "name": "Séance 1A",
                "weeks": "Semaines 1-2",
                "phase": "Phase EMG (Éducation Musculaire Générale)",
                "duration": "~45 min",
                "pattern": "LES 4 PATTERNS FONDAMENTAUX",
                "conseil": "Cette semaine, ce n'est pas la force qu'on cherche, c'est la sensation. À chaque répétition, tu dois bien sentir tes muscles travailler. Charges volontairement légères. On construit avant d'intensifier."
            },
            {
                "id": "seance1b",
                "name": "Séance 1B",
                "weeks": "Semaine 1",
                "phase": "Phase EMG",
                "duration": "~45 min",
                "pattern": "LES 4 PATTERNS, ANGLES DIFFÉRENTS"
            },
            {
                "id": "seance1c",
                "name": "Séance 1C",
                "weeks": "Semaine 2",
                "phase": "Phase EMG",
                "duration": "~45 min",
                "pattern": "CONSOLIDATION DES PATTERNS"
            },
            {
                "id": "seance1d",
                "name": "Séance 1D",
                "weeks": "Semaine 2",
                "phase": "Phase EMG",
                "duration": "~45 min",
                "pattern": "FULL BODY CONSOLIDATION"
            }
        ]
    },
    "ch2": {
        "title": "Chapitre 2",
        "subtitle": "Je me renforce en restant souple",
        "seances": [
            {"id": "seance2a", "name": "Séance 2A", "weeks": "Semaines 3-4"},
            {"id": "seance2b", "name": "Séance 2B", "weeks": "Semaines 3-4"},
            {"id": "seance2c", "name": "Séance 2C", "weeks": "Semaines 3-4"},
            {"id": "seance2d", "name": "Séance 2D", "weeks": "Semaines 3-4"}
        ]
    },
    "ch3": {
        "title": "Chapitre 3",
        "subtitle": "S'allonger, sans se tasser",
        "seances": [
            {"id": "seance3a", "name": "Séance 3A", "weeks": "Semaines 5-6"},
            {"id": "seance3b", "name": "Séance 3B", "weeks": "Semaines 5-6"},
            {"id": "seance3c", "name": "Séance 3C", "weeks": "Semaines 5-6"},
            {"id": "seance3d", "name": "Séance 3D", "weeks": "Semaines 5-6"}
        ]
    },
    "ch4": {
        "title": "Chapitre 4",
        "subtitle": "SCULPTER LES BRAS SANS GONFLER",
        "seances": [
            {"id": "seance4a", "name": "Séance 4A", "weeks": "Semaines 7-8"},
            {"id": "seance4b", "name": "Séance 4B", "weeks": "Semaines 7-8"},
            {"id": "seance4c", "name": "Séance 4C", "weeks": "Semaines 7-8"},
            {"id": "seance4d", "name": "Séance 4D", "weeks": "Semaines 7-8"}
        ]
    },
    "ch5": {
        "title": "Chapitre 5",
        "subtitle": "RENFORCER LES JAMBES",
        "seances": [
            {"id": "seance5a", "name": "Séance 5A", "weeks": "Semaines 7-8"},
            {"id": "seance5b", "name": "Séance 5B", "weeks": "Semaines 7-8"},
            {"id": "seance5c", "name": "Séance 5C", "weeks": "Semaines 7-8"},
            {"id": "seance5d", "name": "Séance 5D", "weeks": "Semaines 7-8"}
        ]
    },
    "ch6": {
        "title": "Chapitre 6",
        "subtitle": "Libérer le corps en redressant la posture",
        "seances": [
            {"id": "seance6a", "name": "Séance 6A", "weeks": "Semaines 9-10"},
            {"id": "seance6b", "name": "Séance 6B", "weeks": "Semaines 9-10"},
            {"id": "seance6c", "name": "Séance 6C", "weeks": "Semaines 9-10"},
            {"id": "seance6d", "name": "Séance 6D", "weeks": "Semaines 9-10"}
        ]
    },
    "ch7": {
        "title": "Chapitre 7",
        "subtitle": "Choisir son cardio sans cramer",
        "seances": [
            {"id": "seance7a", "name": "Séance 7A", "weeks": "Semaines 11-12"},
            {"id": "seance7b", "name": "Séance 7B", "weeks": "Semaines 11-12"},
            {"id": "seance7c", "name": "Séance 7C", "weeks": "Semaines 11-12"},
            {"id": "seance7d", "name": "Séance 7D", "weeks": "Semaines 11-12"}
        ]
    },
    "ch8": {
        "title": "Chapitre 8",
        "subtitle": "Entretenir, progresser et continuer",
        "seances": [
            {"id": "seance8a", "name": "Séance 8A", "weeks": "Au-delà"},
            {"id": "seance8b", "name": "Séance 8B", "weeks": "Au-delà"},
            {"id": "seance8c", "name": "Séance 8C", "weeks": "Au-delà"},
            {"id": "seance8d", "name": "Séance 8D", "weeks": "Au-delà"}
        ]
    }
}

print("Chapter structure created successfully")
print(f"Total chapters: {len(chapters_data)}")
total_seances = sum(len(ch['seances']) for ch in chapters_data.values())
print(f"Total séances: {total_seances}")
