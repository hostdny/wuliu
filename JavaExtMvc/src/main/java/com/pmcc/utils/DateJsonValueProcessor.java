package com.pmcc.utils;

import net.sf.json.JsonConfig;
import net.sf.json.processors.JsonValueProcessor;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * Created by Admin on 2016/1/27.
 */
public class DateJsonValueProcessor implements JsonValueProcessor {
    private static Log logger = LogFactory.getLog(DateJsonValueProcessor.class);
    public static final String DEFAULT_DATE_PATTERN = "yyyy-MM-dd";
    private DateFormat dateFormat;

    public DateJsonValueProcessor(String datePattern) {
        try {
            this.dateFormat = new SimpleDateFormat(datePattern);
        } catch (Exception var3) {
            logger.info(var3);
            this.dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        }

    }

    public Object processArrayValue(Object value, JsonConfig jsonConfig) {
        return this.process(value);
    }

    public Object processObjectValue(String key, Object value, JsonConfig jsonConfig) {
        return this.process(value);
    }

    private Object process(Object value) {
        try {
            return this.dateFormat.format((Date)value);
        } catch (Exception var3) {
            return null;
        }
    }

    public Object processArrayValue(Object arg0) {
        return null;
    }

    public Object processObjectValue(String arg0, Object arg1) {
        return null;
    }
}
