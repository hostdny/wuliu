package com.pmcc.utils;

import java.io.IOException;
import java.security.*;

import javax.crypto.*;
/**
 * 该类用于加密时使用
 * @date 2010-06-07
 * @author wangxx
 */
public class Encript {
	//生成密钥的参数
	final static String keyStr="wangxx";
	/**
	 * 加密
	 * @param scr 要加密的字符串
	 * @param key 秘钥
	 * @return 密文
	 * @throws NoSuchPaddingException 
	 * @throws NoSuchAlgorithmException 
	 * @throws InvalidKeyException 
	 * @throws BadPaddingException 
	 * @throws IllegalBlockSizeException 
	 */
	public static String encript(String scr,Key key) {
		Cipher cipher = null;
		String enCode = null;
		//用KEY进行加密：
		try {
			cipher = Cipher.getInstance("DES");
			cipher.init(Cipher.ENCRYPT_MODE, key);
			byte[] ciphertext = cipher.doFinal(scr.getBytes());
			enCode = new sun.misc.BASE64Encoder().encode(ciphertext);
		} catch (NoSuchAlgorithmException e) {
			e.printStackTrace();
		} catch (NoSuchPaddingException e) {
			e.printStackTrace();
		} catch (InvalidKeyException e) {
			e.printStackTrace();
		} catch (IllegalBlockSizeException e) {
			e.printStackTrace();
		} catch (BadPaddingException e) {
			e.printStackTrace();
		} 
		return enCode;
	}
	/**
	 * 解密
	 * @param scr 密文
	 * @param key 秘钥
	 * @return 解密后明文
	 * @throws NoSuchPaddingException 
	 * @throws NoSuchAlgorithmException 
	 * @throws InvalidKeyException 
	 * @throws IOException 
	 * @throws BadPaddingException 
	 * @throws IllegalBlockSizeException 
	 */
	public static String decript(String scr,Key key){
		Cipher cipher = null;
		String deCode = null;
		try {
			cipher = Cipher.getInstance("DES");
			cipher.init(Cipher.DECRYPT_MODE,key);
			byte[] b1 = new sun.misc.BASE64Decoder().decodeBuffer(scr);
			byte[] b = cipher.doFinal(b1);
			deCode= new String(b);
		} catch (NoSuchAlgorithmException e) {
			e.printStackTrace();
		} catch (NoSuchPaddingException e) {
			e.printStackTrace();
		} catch (InvalidKeyException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		} catch (IllegalBlockSizeException e) {
			e.printStackTrace();
		} catch (BadPaddingException e) {
			e.printStackTrace();
		} 
		return deCode;
	}
	/**
	 * 生成密钥
	 * @param key 制定字符串，初始化秘钥
	 * @return 密钥
	 * @throws NoSuchAlgorithmException 
	 */
	public static Key getKey(String keyStr){
		Key key = null;
		KeyGenerator keyGen;
		try {
			keyGen = KeyGenerator.getInstance("DES");
			SecureRandom secrand=SecureRandom.getInstance("SHA1PRNG" );
			secrand.setSeed(keyStr.getBytes()); //初始化随机产生器
			keyGen.init(56,secrand);     //初始化密钥生成器
			key=keyGen.generateKey();
		} catch (NoSuchAlgorithmException e) {
			e.printStackTrace();
		}
		return key;
	}
	/**
	 * 加密
	 * @param scr 要加密的字符串
	 * @author wangxx
	 * @return 密文
	 * @throws NoSuchAlgorithmException 
	 * @throws NoSuchPaddingException 
	 * @throws InvalidKeyException 
	 * @throws BadPaddingException 
	 * @throws IllegalBlockSizeException 
	 */
	public static String encript(String scr){
		Cipher cipher = null;
		String enCode = null;
		Key key = null;
		//用KEY进行加密：
		KeyGenerator keyGen;
		try {
			keyGen = KeyGenerator.getInstance("DES");
			SecureRandom secrand=SecureRandom.getInstance("SHA1PRNG" );
			secrand.setSeed(keyStr.getBytes()); //初始化随机产生器
			keyGen.init(56,secrand);     //初始化密钥生成器
			key=keyGen.generateKey();
			cipher = Cipher.getInstance("DES"); 
			cipher.init(Cipher.ENCRYPT_MODE, key);
			byte[] ciphertext = cipher.doFinal(scr.getBytes());
			enCode = new sun.misc.BASE64Encoder().encode(ciphertext);
		} catch (NoSuchAlgorithmException e) {
			e.printStackTrace();
		} catch (NoSuchPaddingException e) {
			e.printStackTrace();
		} catch (InvalidKeyException e) {
			e.printStackTrace();
		} catch (IllegalBlockSizeException e) {
			e.printStackTrace();
		} catch (BadPaddingException e) {
			e.printStackTrace();
		}
		return enCode;
	}
	/**
	 * 解密
	 * @param scr 密文
	 * @param key 秘钥
	 * @return 解密后明文
	 * @throws NoSuchAlgorithmException 
	 * @throws NoSuchPaddingException 
	 * @throws InvalidKeyException 
	 * @throws IOException 
	 * @throws BadPaddingException 
	 * @throws IllegalBlockSizeException 
	 */
	public static String decript(String scr) {
		Cipher cipher = null;
		String deCode = null;
		Key key = null;
		KeyGenerator keyGen;
		try {
			keyGen = KeyGenerator.getInstance("DES");
			SecureRandom secrand=SecureRandom.getInstance("SHA1PRNG" );
			secrand.setSeed(keyStr.getBytes()); //初始化随机产生器
			keyGen.init(56,secrand);     //初始化密钥生成器
			key=keyGen.generateKey();
			cipher = Cipher.getInstance("DES"); 
			cipher.init(Cipher.DECRYPT_MODE,key);
			byte[] b1 = new sun.misc.BASE64Decoder().decodeBuffer(scr);
			byte[] b = cipher.doFinal(b1);
			deCode= new String(b);
		} catch (NoSuchAlgorithmException e) {
			e.printStackTrace();
		} catch (NoSuchPaddingException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		} catch (InvalidKeyException e) {
			e.printStackTrace();
		} catch (IllegalBlockSizeException e) {
			e.printStackTrace();
		} catch (BadPaddingException e) {
			e.printStackTrace();
		}
		return deCode;
	}
	/**
	 * @author wangxx
	 * 测试方法
	 * @param args
	 * @throws BadPaddingException 
	 * @throws IllegalBlockSizeException 
	 * @throws NoSuchPaddingException 
	 * @throws NoSuchAlgorithmException 
	 * @throws InvalidKeyException 
	 * @throws IOException 
	 */
	public static void main(String args[]){
		String xx = encript("wangxx");
		String oo = decript(xx);
	}
}
