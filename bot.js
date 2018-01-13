const TelegramBotApi = require('node-telegram-bot-api');
const fs = require('fs');
const utils = require('./utils');

const TOKEN = '370476736:AAGyaqeQliX0nNVRy5ZgT56DcsEKSotgMIw';

function initialBot() {

    const bot = new TelegramBotApi(TOKEN, {polling: true});

    bot.onText(/\/start/, function (msg) {
        bot.sendMessage(msg.chat.id, 'Привет, я тупой бот Арсена, присылаю тебе клавиатуру дальше сама выбирай что делать :)', {
            reply_markup: {
                keyboard: [
                    ['Привет', 'Хочу получить картинку', 'Хочу получить музыку'],
                    ['Закрыть']
                ]
            }
        })
    });

    bot.on('message', function(msg) {
        if (msg.text === '/start')
            return;

        switch (msg.text) {
            case 'Привет':
                bot.sendMessage(msg.chat.id, `Привет, ${msg.from.first_name} ${msg.from.last_name}`);
                break;

            case 'Хочу получить музыку':
                bot.sendAudio(msg.chat.id, `https://cs1-79v4.vk-cdn.net/p4/2872923df525d2.mp3?extra=zQs6ZYJtG2hNjjP5lp8GTCnZi5HunhH0-xfQO86Ts1FeF6L7wHMl_1yU_NEkB6eGkInlcrKlPz6R00FBRXJ7NwoFj3XpENLVEFUn8EvHa_5Lh1tV1piME6HKy8XRAUrcWw40KyKH6Fdu`);
                break;


            case 'Хочу получить картинку':
                const id = utils.getRandomInt(0, 50);
                bot.sendPhoto(msg.chat.id, `http://iscalio.com/cats/${id}.jpg`);
                break;

            case 'Закрыть':
                bot.sendMessage(msg.chat.id, 'Закрываю клавиатуру', {
                    reply_markup: {
                        remove_keyboard: true
                    }
                });
                break;

            default:
                bot.sendMessage(msg.chat.id, 'Я не знаю такой команды :)');
                break;
        }

    });
}

module.exports = {
  initialBot
};