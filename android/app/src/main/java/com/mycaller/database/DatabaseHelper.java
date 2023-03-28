// package com.mycaller.database;

// import android.content.Context;
// import android.database.Cursor;
// import android.database.sqlite.SQLiteDatabase;
// import android.database.sqlite.SQLiteOpenHelper;
// import android.util.Log;

// public class DatabaseHelper extends SQLiteOpenHelper {
// public static final String tableName = "catalystLocalStorage";
// private Context context;
//     public DatabaseHelper(Context context) {
//         super(context, "RKStorage", null, 1);
//         this.context = context;

//     }

//     private static DatabaseHelper instance;

//     public static synchronized DatabaseHelper getInstance(Context context) {
//         if (instance == null)
//             instance = new DatabaseHelper(context);

//         return instance;
//     }
//     @Override
//     public void onCreate(SQLiteDatabase sqLiteDatabase) {

//     }

//     @Override
//     public void onUpgrade(SQLiteDatabase sqLiteDatabase, int i, int i1) {

//     }

//     public void fetchData() {
//         String filter = "Select * from " + tableName;
//         filter = filter  + " where key = 'loginData'" ;
//         SQLiteDatabase db = this.getWritableDatabase();
//         Cursor cursor = db.rawQuery(filter, null);

//         // looping through all rows and adding to list
//         if (cursor.moveToFirst()) {
//             do {
//                 String key = cursor.getString(cursor.getColumnIndex("key"));
//                 String value = cursor.getString(cursor.getColumnIndex("value"));
// //
//                 Log.d("cakhjbc",key);
//                 Log.d("asda", value);
//             } while (cursor.moveToNext());
//         }

//         // close db connection
//         db.close();
//         cursor.close();
//     }
// }
