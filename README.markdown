# Ungibberize: Watch Your Language

JavaScript library for allowing the user to fix text that was already entered in the wrong language.

## Introduction

Multi-language users often type many characters in a text field without looking at the screen, before realizing they were using the wrong language. Since this gibberish is unusable, the user will often delete it, switch to the correct language, and type all over again.

Ungibberize attempts to detect whether the text was entered in the correct language, and if not, show a button that fixes the mistyped text.

Ungibberize currently supports gibberish written in English instead of Hebrew.

## Installation

## Usage

## Behavior

The following state machine is used:


                          gibberish
              gnd  .-----not-detected-----.  gd
              .-.  |                      |  .-.
              v |  v                      |  | v
         .-----------.    gibberish     .--------.
    .--->| no_button |----detected----->| button |<---.
    |    '-----------'                  '--------'    |
    |          ^                            |         |
    |          |                         clicked      |
    |       cleared                         |         |
    |          |                            v      clicked
    |     .----------.                   .------.     |
    |     | inactive |<------------------| undo |-----'
    |     '----------'                   '------'
    |        ^ |                            |
    |        '-'                         cleared
    |                                       |
    '---------------------------------------'

Generally, the text field changes from `button` to `no_button` which shows or hides the correction button. Once clicked, an undo button is shown, at which time a click will undo and return to the `button` state, or a key will be pressed and no more corrections can be made. Clearing the text field resets the state to `no_button`.