<?php
header('Content-Type: application/json');
$response = ['success' => false, 'message' => ''];
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = trim($_POST['name'] ?? '');
    $email = trim($_POST['email'] ?? '');
    $message = trim($_POST['message'] ?? '');
    if (strlen($name) < 2) {
        $response['message'] = 'Name is too short.';
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $response['message'] = 'Invalid email address.';
    } elseif (strlen($message) < 5) {
        $response['message'] = 'Message is too short.';
    } else {
        // Simulate sending email (replace with mail() in production)
        // $to = 'your@email.com';
        // $subject = 'Portfolio Contact Form';
        // $body = "Name: $name\nEmail: $email\nMessage: $message";
        // $headers = "From: $email";
        // $sent = mail($to, $subject, $body, $headers);
        $sent = true; // Simulate success
        if ($sent) {
            $response['success'] = true;
            $response['message'] = 'Thank you for contacting me! I will get back to you soon.';
        } else {
            $response['message'] = 'Failed to send message. Please try again later.';
        }
    }
} else {
    $response['message'] = 'Invalid request.';
}
echo json_encode($response); 