package com.pmcc.utils;

import net.sf.json.*;
import net.sf.json.processors.DefaultValueProcessor;
import net.sf.json.util.CycleDetectionStrategy;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import java.io.Writer;
import java.sql.Timestamp;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * Created by Admin on 2016/1/26.
 */
public class JsonUtils {
    private static Log logger = LogFactory.getLog(JsonUtils.class);

    protected JsonUtils() {
    }

    public static void write(Object bean, Writer writer, String[] excludes, String datePattern) throws Exception {
        String pattern = null;
        if(datePattern != null) {
            pattern = datePattern;
        } else {
            pattern = "yyyy-MM-dd";
        }

        JsonConfig jsonConfig = configJson(excludes, pattern);
        JSON json = JSONSerializer.toJSON(bean, jsonConfig);
        json.write(writer);
    }

    public static JsonConfig configJson(String[] excludes, String datePattern) {
        JsonConfig jsonConfig = new JsonConfig();
        jsonConfig.setExcludes(excludes);
        jsonConfig.setIgnoreDefaultExcludes(false);
        jsonConfig.setCycleDetectionStrategy(CycleDetectionStrategy.LENIENT);
        jsonConfig.registerDefaultValueProcessor(Integer.class, new DefaultValueProcessor() {
            public Object getDefaultValue(Class type) {
                return JSONNull.getInstance();
            }
        });
        jsonConfig.registerDefaultValueProcessor(Double.class, new DefaultValueProcessor() {
            public Object getDefaultValue(Class type) {
                return JSONNull.getInstance();
            }
        });
        jsonConfig.registerDefaultValueProcessor(Float.class, new DefaultValueProcessor() {
            public Object getDefaultValue(Class type) {
                return JSONNull.getInstance();
            }
        });
        jsonConfig.registerDefaultValueProcessor(Byte.class, new DefaultValueProcessor() {
            public Object getDefaultValue(Class type) {
                return JSONNull.getInstance();
            }
        });
        jsonConfig.registerDefaultValueProcessor(Long.class, new DefaultValueProcessor() {
            public Object getDefaultValue(Class type) {
                return JSONNull.getInstance();
            }
        });
        jsonConfig.registerJsonValueProcessor(Date.class, new DateJsonValueProcessor(datePattern));
        jsonConfig.registerJsonValueProcessor(Timestamp.class, new DateJsonValueProcessor(datePattern));
        return jsonConfig;
    }

    public static boolean isPrimivite(Class clazz) {
        return isByte(clazz)?true:(isShort(clazz)?true:(isInt(clazz)?true:(isLong(clazz)?true:(isFloat(clazz)?true:(isDouble(clazz)?true:(isBoolean(clazz)?true:isChar(clazz)))))));
    }

    public static boolean isString(Class clazz) {
        return clazz == String.class;
    }

    public static boolean isByte(Class clazz) {
        return clazz == Byte.class || clazz == Byte.TYPE;
    }

    public static boolean isShort(Class clazz) {
        return clazz == Short.class || clazz == Short.TYPE;
    }

    public static boolean isInt(Class clazz) {
        return clazz == Integer.class || clazz == Integer.TYPE;
    }

    public static boolean isLong(Class clazz) {
        return clazz == Long.class || clazz == Long.TYPE;
    }

    public static boolean isFloat(Class clazz) {
        return clazz == Float.class || clazz == Float.TYPE;
    }

    public static boolean isDouble(Class clazz) {
        return clazz == Double.class || clazz == Double.TYPE;
    }

    public static boolean isBoolean(Class clazz) {
        return clazz == Boolean.class || clazz == Boolean.TYPE;
    }

    public static boolean isChar(Class clazz) {
        return clazz == Character.class || clazz == Character.TYPE;
    }

    public static boolean isDate(Class clazz) {
        return clazz == Date.class;
    }

    public static boolean isTimestamp(Class clazz) {
        return clazz == Timestamp.class;
    }

    public static SimpleDateFormat getDateFormat(String datePattern) {
        return datePattern == null?new SimpleDateFormat("yyyy-MM-dd"):new SimpleDateFormat(datePattern);
    }

    public static DateFormat getSqlTime(String datePattern) {
        return datePattern == null?new SimpleDateFormat("yyyy-MM-dd"):new SimpleDateFormat(datePattern);
    }


}