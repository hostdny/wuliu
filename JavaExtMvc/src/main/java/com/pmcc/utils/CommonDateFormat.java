package com.pmcc.utils;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;

/**
 * 前台展示时通用日期转换(只要日期)
 * @author syx
 *
 */
public class CommonDateFormat extends JsonSerializer<Date>{

	@Override
	public void serialize(Date arg0, JsonGenerator arg1, SerializerProvider arg2)
			throws IOException, JsonProcessingException {
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		String formatDate = sdf.format(arg0);
		arg1.writeString(formatDate);
	}
	
}
