<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Spatie\Activitylog\Models\Activity;

class ActivityController extends Controller
{
    public function index(Request $request)
    {
        $activities = Auth::user()->role_id == 1 ?
            Activity::query()
                ->with(['causer', 'subject'])
                ->where(function($q) use ($request){
                    if ($request->search) {
                        $q->whereHas('causer', function ($q) use ($request) {
                            $q->where('first_name', 'like', '%'.$request->search.'%')
                                ->orWhere('middle_name', 'like', '%'.$request->search.'%')
                                ->orWhere('last_name', 'like', '%'.$request->search.'%')
                                ->orWhere(DB::raw("CONCAT_WS(' ', first_name, middle_name, last_name)"), 'like', '%'.$request->search.'%')
                                ->orWhere(DB::raw("CONCAT_WS(' ', first_name, last_name)"), 'like', '%'.$request->search.'%')
                                ->orWhere(DB::raw("CONCAT_WS(' ', last_name, first_name, middle_name)"), 'like', '%'.$request->search.'%');
                        })->orWhere('properties->name', 'like', '%'.$request->search.'%')
                            ->orWhere('properties->from->name', 'like', '%'.$request->search.'%')
                            ->orWhere('properties->to->name', 'like', '%'.$request->search.'%');
                    }
                })
                ->orderBy('created_at', 'desc')
                ->paginate(20)
                ->withQueryString() :
            Activity::query()
                ->where('description', Auth::user()->role_id)
                ->orderBy('created_at', 'desc')
                ->with(['causer', 'subject'])
                ->where(function($q) use ($request){
                    if ($request->search) {
                        $q->whereHas('causer', function ($q) use ($request) {
                            $q->where('first_name', 'like', '%'.$request->search.'%')
                                ->orWhere('middle_name', 'like', '%'.$request->search.'%')
                                ->orWhere('last_name', 'like', '%'.$request->search.'%')
                                ->orWhere(DB::raw("CONCAT_WS(' ', first_name, middle_name, last_name)"), 'like', '%'.$request->search.'%')
                                ->orWhere(DB::raw("CONCAT_WS(' ', first_name, last_name)"), 'like', '%'.$request->search.'%')
                                ->orWhere(DB::raw("CONCAT_WS(' ', last_name, first_name, middle_name)"), 'like', '%'.$request->search.'%');
                        })->orWhere('properties->name', 'like', '%'.$request->search.'%')
                            ->orWhere('properties->from->name', 'like', '%'.$request->search.'%')
                            ->orWhere('properties->to->name', 'like', '%'.$request->search.'%');
                    }
                })
                ->paginate(20)
                ->withQueryString();

        if ($request->wantsJson()) {
            return $activities;
        }
        
        return inertia('Activity/Log', [
            'activities' => $activities,
            'filters' => $request->only(['search'])
        ]);
    }
}
