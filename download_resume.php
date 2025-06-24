<?php
$file = 'resume.pdf';
if (file_exists($file)) {
    header('Content-Type: application/pdf');
    header('Content-Disposition: attachment; filename="resume.pdf"');
    header('Content-Length: ' . filesize($file));
    readfile($file);
    exit;
} else {
    echo 'Resume not found.';
} 