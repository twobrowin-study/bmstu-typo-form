# Форма калькулятора Типографии

Pocketbase приложение и svelte фронт для реализации калькулятора для рассчёта типографских заказов.

После запуска приложения следует инциализировать значения во всех коллекциях БД кроме orders.

## Сборка

```bash
docker build . --push -t twobrowin/typo-form:<version>
```

## Развёртывание Бота в коробке для ДОЛ "Бауманец" 2024г.

```bash
cd deploy
```

### Предвариательные требования

Установить коллекцию vats:
```bash
ansible-galaxy install -r requirements.yml
```

### Доступ по ssh

После подготовки возможно получить доступ к машинам при помощи команды:
```bash
ansible -i inventory.yaml all --module-name include_role --args name=bmstu.vats.ssh_connection
```

### Запуск

```bash
ansible-playbook playbook.yaml -i inventory.yaml -t deploy
```

### Добавление параметров Nginx

```bash
ansible-playbook playbook.yaml -i inventory.yaml -t nginx_config
```