package com.pmcc.utils;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.util.*;

import java.lang.reflect.Field;
import java.security.AccessController;
import java.security.PrivilegedAction;

/**
 * Created by Admin on 2016/1/26.
 */
public class BeanUtils {
    private static Log logger = LogFactory.getLog(BeanUtils.class);

    protected BeanUtils() {
    }

    public static Field getDeclaredField(Object object, String propertyName) throws NoSuchFieldException {
        Assert.notNull(object);
        Assert.hasText(propertyName);
        return getDeclaredField(object.getClass(), propertyName);
    }

    public static Field getDeclaredField(Class clazz, String propertyName) throws NoSuchFieldException {
        Assert.notNull(clazz);
        Assert.hasText(propertyName);
        Class superClass = clazz;

        while(superClass != Object.class) {
            try {
                return superClass.getDeclaredField(propertyName);
            } catch (NoSuchFieldException var4) {
                System.err.println(var4);
                superClass = superClass.getSuperclass();
            }
        }

        throw new NoSuchFieldException("No such field: " + clazz.getName() + '.' + propertyName);
    }

    public static Object forceGetProperty(final Object object, String propertyName) throws NoSuchFieldException {
        Assert.notNull(object);
        Assert.hasText(propertyName);
        final Field field = getDeclaredField(object, propertyName);
        return AccessController.doPrivileged(new PrivilegedAction() {
            public Object run() {
                boolean accessible = field.isAccessible();
                field.setAccessible(true);
                Object result = null;

                try {
                    result = field.get(object);
                } catch (IllegalAccessException var4) {
                    BeanUtils.logger.info("error wont\' happen");
                }

                field.setAccessible(accessible);
                return result;
            }
        });
    }

    public static void forceSetProperty(final Object object, String propertyName, final Object newValue) throws NoSuchFieldException {
        Assert.notNull(object);
        Assert.hasText(propertyName);
        final Field field = getDeclaredField(object, propertyName);
        AccessController.doPrivileged(new PrivilegedAction() {
            public Object run() {
                boolean accessible = field.isAccessible();
                field.setAccessible(true);

                try {
                    field.set(object, newValue);
                } catch (IllegalAccessException var3) {
                    BeanUtils.logger.info("Error won\'t happen");
                }

                field.setAccessible(accessible);
                return null;
            }
        });
    }
}
