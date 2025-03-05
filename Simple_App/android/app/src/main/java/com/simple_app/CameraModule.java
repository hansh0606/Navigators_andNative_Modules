package com.simple_app;

import android.app.Activity;
import android.content.Intent;
import android.net.Uri;
import android.os.Environment;
import android.provider.MediaStore;
import androidx.core.content.FileProvider;

import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.BaseActivityEventListener;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;

public class CameraModule extends ReactContextBaseJavaModule {
    private static final int IMAGE_CAPTURE_REQUEST = 1;
    private Promise mPromise;
    private Uri mPhotoUri;
    private final ReactApplicationContext reactContext;

    public CameraModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;

        // Register activity event listener
        reactContext.addActivityEventListener(new BaseActivityEventListener() {
            @Override
            public void onActivityResult(Activity activity, int requestCode, int resultCode, Intent data) {
                if (requestCode == IMAGE_CAPTURE_REQUEST) {
                    if (resultCode == Activity.RESULT_OK) {
                        if (mPromise != null) {
                            mPromise.resolve(mPhotoUri.toString());
                        }
                    } else if (resultCode == Activity.RESULT_CANCELED) {
                        if (mPromise != null) {
                            mPromise.reject("CAMERA_CANCELLED", "User cancelled the image capture");
                        }
                    } else {
                        if (mPromise != null) {
                            mPromise.reject("CAMERA_ERROR", "Failed to capture image");
                        }
                    }
                    mPromise = null;
                }
            }
        });
    }

    @Override
    public String getName() {
        return "CameraModule";
    }

    @ReactMethod
    public void captureImage(Promise promise) {
        Activity currentActivity = getCurrentActivity();

        if (currentActivity == null) {
            promise.reject("ACTIVITY_ERROR", "Activity is not available");
            return; 
        }

        // Save the promise to resolve/reject later
        mPromise = promise;

        // Create the camera intent
        Intent takePictureIntent = new Intent(MediaStore.ACTION_IMAGE_CAPTURE);

        // Ensure that there's a camera activity to handle the intent
        if (takePictureIntent.resolveActivity(reactContext.getPackageManager()) != null) {
            // Create the file where the photo should go
            File photoFile = null;
            try {
                photoFile = createImageFile();
            } catch (IOException ex) {
                promise.reject("FILE_ERROR", "Error creating image file", ex);
                mPromise = null;
                return;
            }

            // Continue only if the file was successfully created
            if (photoFile != null) {
                // Get URI from file using FileProvider
                mPhotoUri = FileProvider.getUriForFile(reactContext,
                        reactContext.getPackageName() + ".fileprovider",
                        photoFile);

                takePictureIntent.putExtra(MediaStore.EXTRA_OUTPUT, mPhotoUri);
                currentActivity.startActivityForResult(takePictureIntent, IMAGE_CAPTURE_REQUEST);
            }
        } else {
            promise.reject("CAMERA_UNAVAILABLE", "No camera app available");
            mPromise = null;
        }
    }

    private File createImageFile() throws IOException {
        // Create an image file name
        String timeStamp = new SimpleDateFormat("yyyyMMdd_HHmmss").format(new Date());
        String imageFileName = "IMG_" + timeStamp + "_";
        File storageDir = reactContext.getExternalFilesDir(Environment.DIRECTORY_PICTURES);

        return File.createTempFile(
                imageFileName,  /* prefix */
                ".jpg",         /* suffix */
                storageDir      /* directory */
        );
    }
}

