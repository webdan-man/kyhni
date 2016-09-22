<?php
    $frm = $_POST['frm-name'];
    $name = $_POST['name'];
    $phone = $_POST['phone'];
    $material = $_POST['material'];
    $application = $_POST['application'];
    $kitchen = $_POST['kitchen-form'];
    $optional = $_POST['optional'];
    $product = $_POST['product'];
    $stage = $_POST['stage'];

    $utm_source = $_POST['utm_source'];
    $utm_medium = $_POST['utm_medium'];
    $utm_campaign = $_POST['utm_campaign'];
    $utm_term = $_POST['utm_term'];
    $source_type = $_POST['source_type'];
    $source = $_POST['source'];
    $position_type = $_POST['position_type'];
    $position = $_POST['position'];
    $added = $_POST['added'];
    $creative = $_POST['creative'];
    $matchtype = $_POST['matchtype'];
    $location = $_POST['location'];
    $url = $_POST['url'];
    $title = $_POST['title'];
    $subject = 'Заявка Remont';
    $headers.= "X-Mailer: PHP/" . phpversion()."\n";
    $headers.= "MIME-Version: 1.0" . "\n";
    $headers.= "Content-type: text/plain; charset=utf-8\n";
    $to = "papik5@mail.ru";

    $message = "Форма: $frm\n";
    $message .= "Имя: $name\n";
    $message .= "Телефон: $phone\n";
    $message .= "Порода дерева: $material\n";
    $message .= "Тип покрытия: $application\n";
    $message .= "Форма кухни: $kitchen\n";
    $message .= "Изделия которые будут входить в комплекс?: $optional\n";
    $message .= "Стадия ремонта: $stage\n";

    $message .= "Источник: $utm_source\n";
    $message .= "Тип источника: $utm_medium\n";
    $message .= "Кампания: $utm_campaign\n";
    $message .= "Ключевое слово: $utm_term\n";
    $message .= "Тип площадки(поиск или контекст): $source_type\n";
    $message .= "Площадка: $source\n";
    $message .= "Спецразмещение или гарантия: $position_type\n";
    $message .= "Позиция объявления в блоке: $position\n";
    $message .= "Показ по дополнительным ролевантным фразам: $added\n";
    $message .= "Идентификатор объявления: $creative\n";
    $message .= "Тип соответствия ключа(e-точное/p-фразовое/b-широкое): $matchtype\n";
    $message .= "Гео-положение отправителя: $location\n";
    $message .= "Ссылка на сайт: $url\n";
    $message .= "Заголовок: $title\n";

    mail ($to,$subject,$message,$headers);
?>