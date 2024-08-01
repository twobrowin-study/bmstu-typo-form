# Форма калькулятора Типографии

Pocketbase приложение и svelte фронт для реализации калькулятора для рассчёта типографских заказов.

После запуска приложения следует инциализировать значения во всех коллекциях БД кроме orders.

## Сборка

```bash
docker build . --push -t twobrowin/bmstu-typo-form:<version>
```

## Развёртывание Бота в коробке для ДОЛ "Бауманец" 2024г.

### Предвариательные требования

Установить коллекцию vats:
```bash
ansible-galaxy install -r deploy/requirements.yml
```

### Доступ по ssh

После подготовки возможно получить доступ к машинам при помощи команды:
```bash
ansible -i deploy/inventory.yaml all --module-name include_role --args name=bmstu.vats.ssh_connection
```

### Запуск

```bash
ansible-playbook deploy/playbook.yaml -i deploy/inventory.yaml -t deploy
```

### Добавление параметров Nginx

```bash
ansible-playbook deploy/playbook.yaml -i deploy/inventory.yaml -t nginx_config
```