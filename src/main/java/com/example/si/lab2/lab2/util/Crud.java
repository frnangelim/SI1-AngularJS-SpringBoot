package com.example.si.lab2.lab2.util;

import java.util.List;

public interface Crud<T> {
    T create(T t);

    List<T> getAll();

    T getById(Integer id);

    T update(T t);

    boolean removeById(Integer id);

    boolean removeAll();
}